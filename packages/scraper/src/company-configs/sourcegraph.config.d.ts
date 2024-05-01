import { Job } from "types";
export declare function applyPostScrapingCustomizations(job: Job): {
    title: string;
    location: string;
    department: string;
    url: string;
    id: string;
    _id: string;
    _updatedAt: number;
    companyId: string;
    company?: string | undefined;
    normalizedLocation?: string[] | undefined;
    normalizedDepartment?: string | undefined;
    createdAt?: number | undefined;
    updatedAt?: number | undefined;
};
