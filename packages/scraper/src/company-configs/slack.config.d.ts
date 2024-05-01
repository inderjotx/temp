import { Job } from "types";
export declare function applyPostScrapingCustomizations(job: Job): {
    department: string;
    url: string;
    id: string;
    title: string;
    location: string;
    _id: string;
    _updatedAt: number;
    companyId: string;
    company?: string | undefined;
    normalizedLocation?: string[] | undefined;
    normalizedDepartment?: string | undefined;
    createdAt?: number | undefined;
    updatedAt?: number | undefined;
};
