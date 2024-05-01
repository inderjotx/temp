"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeJobs = void 0;
const data_api_1 = require("@remotebear/data-api");
const puppeteer_1 = require("./services/puppeteer");
const normalizer_1 = require("@remotebear/normalizer");
// @ts-ignore
const company_configs_1 = require("./company-configs");
const greenhouse_strategy_1 = require("./strategies/greenhouse-strategy");
const lever_strategy_1 = require("./strategies/lever-strategy");
const workable_strategy_1 = require("./strategies/workable-strategy");
const recruitee_strategy_1 = require("./strategies/recruitee-strategy");
const personio_strategy_1 = require("./strategies/personio-strategy");
const workday_strategy_1 = require("./strategies/workday-strategy");
const smartrecruiters_strategy_1 = require("./strategies/smartrecruiters-strategy");
function applyPostScrapingCustomizations(job, companyConfig) {
    const jobCompanyConfig = companyConfig[job.companyId];
    if (jobCompanyConfig && jobCompanyConfig.applyPostScrapingCustomizations) {
        return jobCompanyConfig.applyPostScrapingCustomizations(job);
    }
    return job;
}
// Deduplicate jobs that:
// - have the same ID
// - have the same location + title + creation date
function dedupe(job, index, jobs) {
    console.log('DEDUPE ing -------------------------------------------------------------');
    return (jobs.findIndex((j) => (j.id === job.id ||
        (j.title === job.title &&
            j.location === job.location &&
            j.createdAt === job.createdAt)) &&
        j.companyId === job.companyId) === index);
}
function setNormalizedLocation(job, companyConfig) {
    console.log('SET NORMALIZED LOCATION -------------------------------------------------');
    return {
        ...job,
        normalizedLocation: (0, normalizer_1.getNormalizedLocation)(job, companyConfig),
    };
}
function setNormalizedDepartment(job) {
    console.log('SET NORMALIZED DEPARTMENT ------------------------------------------------');
    return {
        ...job,
        normalizedDepartment: (0, normalizer_1.getNormalizedDepartment)(job),
    };
}
function isValidJob(job) {
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
function isRemote(job) {
    console.log('IS REMOTE ----------------------------------------------------------------');
    return (job.location &&
        (job.location.toLowerCase().includes("remote") ||
            job.location.toLowerCase() === "anywhere"));
}
function sanitizeJob(job) {
    console.log('SANITIZE JOB --------------------------------------------------------------');
    return {
        ...job,
        department: (job.department || "").trim(),
        location: job.location === "REMOTE" || job.location === "Remote, Remote"
            ? "Remote"
            : job.location.trim(),
        title: job.title.trim(),
    };
}
function addCompanyId(job, companyId) {
    console.log('ADD COMPANY ID ------------------------------------------------------------');
    return {
        ...job,
        companyId,
        id: `${companyId}_${job.id}`,
    };
}
async function scrapeJobs({ companyId, onCompanyScraped = () => { }, onCompanyScrapingFailed = () => { }, } = {}) {
    await (0, puppeteer_1.initialize)();
    const scrapingTimings = [];
    const scrapingErrors = {};
    const invalidScrapedJobs = [];
    const companyConfig = await (0, company_configs_1.loadAllConfigs)();
    const companyJobRunnerPromises = data_api_1.allCompanies
        .filter((company) => companyId ? company.id === companyId : company.status === "enabled")
        .map(async (company) => {
        const startTime = Date.now();
        let jobs = [];
        let scrapingError;
        try {
            if (company.scrapingStrategy === "greenhouse") {
                console.log("Start GreenHouse -------------------------------------------------------------");
                jobs = await (0, greenhouse_strategy_1.getJobsFromGreenhouse)(company?.scrapingConfig?.id || "");
                console.log("End GreenHouse -------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "lever") {
                console.log("Start Lever -------------------------------------------------------------");
                jobs = await (0, lever_strategy_1.getJobsFromLever)(company?.scrapingConfig?.id || "");
                console.log("End Lever -------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "workable") {
                console.log("Start Workable -------------------------------------------------------------");
                jobs = await (0, workable_strategy_1.getJobsFromWorkable)(company?.scrapingConfig?.id || "");
                console.log("End Workable-------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "recruitee") {
                console.log("Start Recutee -------------------------------------------------------------");
                jobs = await (0, recruitee_strategy_1.getJobsFromRecruitee)(company?.scrapingConfig?.id || "");
                console.log("End Recutee -------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "personio") {
                console.log("Start Persion-------------------------------------------------------------");
                jobs = await (0, personio_strategy_1.getJobsFromPersonio)(company?.scrapingConfig?.version || 0, company?.scrapingConfig?.id || "");
                console.log("ENd Persion-------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "smartrecruiters") {
                console.log("Start SmartRecruiters -------------------------------------------------------------");
                jobs = await (0, smartrecruiters_strategy_1.getJobsFromSmartrecruiters)(company?.scrapingConfig?.id || "");
                console.log("End SmartRecruiters -------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "workday") {
                console.log("Start Workday-------------------------------------------------------------");
                jobs = await (0, workday_strategy_1.getJobsFromWorkday)(company?.scrapingConfig?.url || "");
                console.log("End Workday-------------------------------------------------------------");
            }
            else if (company.scrapingStrategy === "custom") {
                console.log("Start Custom-------------------------------------------------------------");
                // @ts-ignore
                jobs = await companyConfig[company.id].scrapeJobs();
                console.log("End Custom-------------------------------------------------------------");
            }
        }
        catch (err) {
            scrapingError = err;
            scrapingErrors[company.id] = err;
        }
        if (scrapingError) {
            onCompanyScrapingFailed(company, scrapingError);
        }
        jobs = jobs.map((job) => addCompanyId(job, company.id));
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
    await (0, puppeteer_1.teardown)();
    return { scrapedJobs, scrapingTimings, scrapingErrors, invalidScrapedJobs };
}
exports.scrapeJobs = scrapeJobs;
