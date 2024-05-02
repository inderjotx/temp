import fs from "fs";
import path from "path"
import prettier from 'prettier'
import jobsData from "@tokenjobs/data/jobs/jobs-data.json"
import { Job } from "@tokenjobs/types"



export function writeJobs(jobs: Job[]) {
  fs.writeFileSync(
    path.resolve(__dirname, "../../data/jobs/jobs-data.json"),
    prettier.format(JSON.stringify(jobs), {
      printWidth: 1000,
      parser: "json",
    })
  );
}

export function getTempCompanyJobsPath(companyId: string) {
  return `../../data/jobs/jobs-data.${companyId}.temp.json`;
}

export function getTempCompanyJobs(companyId: string) {
  return require(getTempCompanyJobsPath(companyId));
}

export function writeTempCompanyJobs(companyId: string, jobs: Job[]) {
  fs.writeFileSync(
    path.resolve(__dirname, getTempCompanyJobsPath(companyId)),
    JSON.stringify(jobs)
  );
}


export function buildUpdatedJobs({ previousJobs, currentJobs, skippedCompanyIds }: { previousJobs: Job[], currentJobs: Job[], skippedCompanyIds: string[] }) {
  const removedJobs = previousJobs.filter((previousJob) => {
    if (skippedCompanyIds.includes(previousJob.companyId)) {
      return false;
    }
    const currentJobIds = currentJobs.map((currentJob) => currentJob.id);
    return !currentJobIds.includes(previousJob.id);
  });
  const addedJobs: Job[] = [];
  const previousJobsFromSkippedCompanies: Job[] = previousJobs.filter((job) =>
    skippedCompanyIds.includes(job.companyId)
  );
  const jobs: Job[] = currentJobs
    .map((currentJob) => {
      const previousJob = previousJobs.find(
        (previousJob) => currentJob.id === previousJob.id
      );
      const job = {
        ...currentJob,
        createdAt:
          (previousJob && previousJob.createdAt) ||
          currentJob._updatedAt ||
          Date.now(),
      };
      if (!previousJob) {
        addedJobs.push(job);
      }
      return job;
    })
    .concat(previousJobsFromSkippedCompanies as any)
    .sort((a, b) => {
      // Sort jobs by "createdAt" and eventually "id"
      if (a.createdAt !== b.createdAt) {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      return a.id < b.id ? 1 : -1;
    });
  return {
    jobs,
    removedJobs,
    addedJobs,
    skippedJobs: previousJobsFromSkippedCompanies,
  };
}

export const allJobs = jobsData
export const jobsFilePath = "packages/data/jobs/jobs-data.json"
export const jobsHistoryDir = "packages/data/jobs-history"


