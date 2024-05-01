import { Job } from "types";
export declare function fetchJobsFromSmartrecruiters(params: {
    companyId: string;
    limit: number;
    offset: number;
}): Promise<any>;
export declare function getJobsFromSmartrecruiters(smartrecruitersCompanyId: string, params?: {
    limit: number;
}): Promise<Job[]>;
