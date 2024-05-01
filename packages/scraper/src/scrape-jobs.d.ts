import { Company } from "types";
export declare function scrapeJobs({ companyId, onCompanyScraped, onCompanyScrapingFailed, }?: {
    companyId?: string;
    onCompanyScraped?: (company: Company, time: number) => void;
    onCompanyScrapingFailed?: (company: Company, error: Error) => void;
}): Promise<{
    scrapedJobs: {
        department: string;
        location: string;
        title: string;
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
    }[];
    scrapingTimings: [Company, number][];
    scrapingErrors: Record<string, Error>;
    invalidScrapedJobs: any[];
}>;
