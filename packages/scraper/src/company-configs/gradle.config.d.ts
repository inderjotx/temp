import { Job } from "types";
declare function applyPostScrapingCustomizations(job: Job): {
    location: string;
    department: string;
    url: string;
    id: string;
    title: string;
    _id: string;
    _updatedAt: number;
    companyId: string;
    company?: string | undefined;
    normalizedLocation?: string[] | undefined;
    normalizedDepartment?: string | undefined;
    createdAt?: number | undefined;
    updatedAt?: number | undefined;
};
export { applyPostScrapingCustomizations, };
