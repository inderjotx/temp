import { Company } from "@remotebear/types";
export declare let allCompanies: Company[];
export declare const allCompaniesById: Record<string, Company>;
export declare function getCompany(companyId: string): Company;
export declare function validateCompany(company: Partial<Company>): void;
export declare function createCompany(company: Company): Promise<{
    id: string;
    name: string;
    url: string;
    crunchbaseConfig: {
        id: string;
    };
    crunchbaseMeta: {};
    scrapingConfig: {
        id: string;
        version?: number | undefined;
        url?: string | undefined;
    };
    scrapingStrategy: string;
    status: string;
    createdAt: number;
}>;
export declare function updateCompany(companyId: string, company: Partial<Company>): Promise<{
    crunchbaseConfig: {
        id: string;
    };
    crunchbaseMeta: {};
    id: string;
    name: string;
    scrapingConfig: {
        id: string;
        version?: undefined;
        url?: undefined;
    };
    scrapingStrategy: string;
    status: string;
    url: string;
    createdAt?: undefined;
} | {
    crunchbaseConfig: {
        id: string;
    };
    crunchbaseMeta: {};
    id: string;
    name: string;
    scrapingStrategy: string;
    status: string;
    url: string;
    scrapingConfig?: undefined;
    createdAt?: undefined;
} | {
    crunchbaseConfig: {
        id: string;
    };
    crunchbaseMeta: {};
    id: string;
    name: string;
    scrapingConfig: {
        id: string;
        version?: undefined;
        url?: undefined;
    };
    scrapingStrategy: string;
    status: string;
    url: string;
    createdAt: number;
} | {
    crunchbaseConfig: {
        id: string;
    };
    id: string;
    name: string;
    scrapingConfig: {
        id: string;
        version: number;
        url?: undefined;
    };
    scrapingStrategy: string;
    status: string;
    url: string;
    crunchbaseMeta: {};
    createdAt?: undefined;
} | {
    id: string;
    crunchbaseConfig: {
        id: string;
    };
    name: string;
    scrapingConfig: {
        id: string;
        url: string;
        version?: undefined;
    };
    scrapingStrategy: string;
    status: string;
    url: string;
    crunchbaseMeta: {};
    createdAt?: undefined;
}>;
