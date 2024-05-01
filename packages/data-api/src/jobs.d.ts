import { Job } from "@remotebear/types";
export declare function writeJobs(jobs: Job[]): void;
export declare function getTempCompanyJobsPath(companyId: string): string;
export declare function getTempCompanyJobs(companyId: string): any;
export declare function writeTempCompanyJobs(companyId: string, jobs: Job[]): void;
export declare function buildUpdatedJobs({ previousJobs, currentJobs, skippedCompanyIds }: {
    previousJobs: Job[];
    currentJobs: Job[];
    skippedCompanyIds: string[];
}): {
    jobs: Job[];
    removedJobs: Job[];
    addedJobs: Job[];
    skippedJobs: Job[];
};
export declare const allJobs: any[];
export declare const jobsFilePath = "packages/data/jobs/jobs-data.json";
export declare const jobsHistoryDir = "packages/data/jobs-history";
