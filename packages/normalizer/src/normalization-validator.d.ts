import { Job, Company } from "types";
type NormalizationResult = {
    input: string;
    output: string | string[];
    successful: boolean;
    jobsCount: number;
};
type CompanyResult = {
    normalizations: NormalizationResult[];
    jobsCount: number;
    successfulJobNormalizationsCount: number;
    successfulJobNormalizationsRate: number;
};
type GlobalResults = {
    jobsCount: number;
    successfulJobNormalizationsCount: number;
};
type Results = {
    globalResults: GlobalResults;
    resultsByCompanyId: Record<string, CompanyResult>;
};
export declare function validateNormalization({ jobs, allCompanies, fieldName, getNormalizedValue, }: {
    jobs: Job[];
    allCompanies: Company[];
    fieldName: keyof Job;
    getNormalizedValue: (job: Job) => string | string[] | undefined;
}): Results;
export {};
