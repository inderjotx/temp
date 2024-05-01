import { allCompanies } from "@remotebear/data-api";
import { initialize, evaluatePage, teardown } from "./services/puppeteer";
import {
  getNormalizedLocation,
  getNormalizedDepartment,
} from "@remotebear/normalizer";

// @ts-ignore
import { loadAllConfigs } from "./company-configs";
import { getJobsFromGreenhouse } from "./strategies/greenhouse-strategy";
import { getJobsFromLever } from "./strategies/lever-strategy";
import { getJobsFromWorkable } from "./strategies/workable-strategy";
import { getJobsFromRecruitee } from "./strategies/recruitee-strategy";
import { getJobsFromPersonio } from "./strategies/personio-strategy";
import { getJobsFromWorkday } from "./strategies/workday-strategy";

import {
  getJobsFromSmartrecruiters,
} from "./strategies/smartrecruiters-strategy";
import { Company, Job } from "types";


function applyPostScrapingCustomizations(job: Job, companyConfig: Record<string, any>) {

  const jobCompanyConfig = companyConfig[job.companyId];
  if (jobCompanyConfig && jobCompanyConfig.applyPostScrapingCustomizations) {
    return jobCompanyConfig.applyPostScrapingCustomizations(job);
  }
  return job;
}

// Deduplicate jobs that:
// - have the same ID
// - have the same location + title + creation date
function dedupe(job: Job, index: number, jobs: Job[]) {

  console.log('DEDUPE ing -------------------------------------------------------------');

  return (

    jobs.findIndex(
      (j) =>
        (j.id === job.id ||
          (j.title === job.title &&
            j.location === job.location &&
            j.createdAt === job.createdAt)) &&
        j.companyId === job.companyId
    ) === index
  );
}

function setNormalizedLocation(job: Job, companyConfig: Record<string, any>) {

  console.log('SET NORMALIZED LOCATION -------------------------------------------------');

  return {
    ...job,
    normalizedLocation: getNormalizedLocation(job, companyConfig),
  };
}

function setNormalizedDepartment(job: Job) {

  console.log('SET NORMALIZED DEPARTMENT ------------------------------------------------');

  return {
    ...job,
    normalizedDepartment: getNormalizedDepartment(job),
  };
}

function isValidJob(job: Job) {

  console.log('IS VALID JOB -------------------------------------------------------------');

  if (!job.title || !job.location) {
    return false;
  }
  // CircleCI has a job like this, lol
  if (job.title.includes("Are you not able to find what you're looking for")) {
    return false;
  }
  return true;
}


function isRemote(job: Job) {

  console.log('IS REMOTE ----------------------------------------------------------------');

  return (
    job.location &&
    (job.location.toLowerCase().includes("remote") ||
      job.location.toLowerCase() === "anywhere")
  );
}

function sanitizeJob(job: Job) {

  console.log('SANITIZE JOB --------------------------------------------------------------');

  return {
    ...job,
    department: (job.department || "").trim(),
    location:
      job.location === "REMOTE" || job.location === "Remote, Remote"
        ? "Remote"
        : job.location.trim(),
    title: job.title.trim(),
  };
}

function addCompanyId(job: Job, companyId: string) {

  console.log('ADD COMPANY ID ------------------------------------------------------------');

  return {
    ...job,
    companyId,
    id: `${companyId}_${job.id}`,
  };
}

export async function scrapeJobs({
  companyId,
  onCompanyScraped = () => { },
  onCompanyScrapingFailed = () => { },
}: { companyId?: string, onCompanyScraped?: (company: Company, time: number) => void, onCompanyScrapingFailed?: (company: Company, error: Error) => void } = {}) {
  await initialize();
  const scrapingTimings: [Company, number][] = [];
  const scrapingErrors: Record<string, Error> = {};
  const invalidScrapedJobs: any[] = [];
  const companyConfig = await loadAllConfigs();
  const companyJobRunnerPromises = allCompanies
    .filter((company) =>
      companyId ? company.id === companyId : company.status === "enabled"
    )
    .map(async (company) => {
      const startTime = Date.now();
      let jobs: Job[] = [];
      let scrapingError;
      try {
        if (company.scrapingStrategy === "greenhouse") {
          console.log("Start GreenHouse -------------------------------------------------------------");
          jobs = await getJobsFromGreenhouse(company?.scrapingConfig?.id || "");
          console.log("End GreenHouse -------------------------------------------------------------");
        } else if (company.scrapingStrategy === "lever") {

          console.log("Start Lever -------------------------------------------------------------");
          jobs = await getJobsFromLever(company?.scrapingConfig?.id || "");
          console.log("End Lever -------------------------------------------------------------");

        } else if (company.scrapingStrategy === "workable") {

          console.log("Start Workable -------------------------------------------------------------");
          jobs = await getJobsFromWorkable(company?.scrapingConfig?.id || "");
          console.log("End Workable-------------------------------------------------------------");
        } else if (company.scrapingStrategy === "recruitee") {


          console.log("Start Recutee -------------------------------------------------------------");
          jobs = await getJobsFromRecruitee(company?.scrapingConfig?.id || "");
          console.log("End Recutee -------------------------------------------------------------");
        } else if (company.scrapingStrategy === "personio") {

          console.log("Start Persion-------------------------------------------------------------");
          jobs = await getJobsFromPersonio(
            company?.scrapingConfig?.version || 0,
            company?.scrapingConfig?.id || ""
          );
          console.log("ENd Persion-------------------------------------------------------------");

        } else if (company.scrapingStrategy === "smartrecruiters") {

          console.log("Start SmartRecruiters -------------------------------------------------------------");
          jobs = await getJobsFromSmartrecruiters(company?.scrapingConfig?.id || "");
          console.log("End SmartRecruiters -------------------------------------------------------------");
        } else if (company.scrapingStrategy === "workday") {

          console.log("Start Workday-------------------------------------------------------------");
          jobs = await getJobsFromWorkday(company?.scrapingConfig?.url || "");
          console.log("End Workday-------------------------------------------------------------");
        } else if (company.scrapingStrategy === "custom") {

          console.log("Start Custom-------------------------------------------------------------");

          // @ts-ignore
          jobs = await companyConfig[company.id].scrapeJobs();
          console.log("End Custom-------------------------------------------------------------");
        }
      } catch (err) {
        scrapingError = err;
        scrapingErrors[company.id] = err as Error;
      }
      if (scrapingError) {
        onCompanyScrapingFailed(company, scrapingError as Error);
      }
      jobs = jobs.map((job: Job) => addCompanyId(job, company.id));
      const endTime = Date.now();
      scrapingTimings.push([company, endTime - startTime]);
      onCompanyScraped(company, endTime - startTime);
      return jobs;
    });

  console.log('SCRAPING DONE , now resolving promises ---------------------------------------------------------------');
  const scrapedJobs = (await Promise.all(companyJobRunnerPromises))
    .flat()
    .map((job) => applyPostScrapingCustomizations(job, companyConfig))
    .filter(dedupe)
    .filter(isRemote)
    .filter((job) => {
      if (!isValidJob(job)) {
        invalidScrapedJobs.push(job);
        return false;
      }
      return true;
    })
    .map((job) => setNormalizedLocation(job, companyConfig))
    .map(setNormalizedDepartment)
    .map(sanitizeJob);




  await teardown();

  return { scrapedJobs, scrapingTimings, scrapingErrors, invalidScrapedJobs };
}

