export interface Company {
    crunchbaseConfig?: {
        id: string;
    };
    crunchbaseMeta?: {
        description: string;
        ipo: string;
        numberOfEmployesEnum: string;
        foundedOn: string;
    };
    id: string;
    name: string;
    scrapingConfig?: {
        id: string;
        version?: number;
        url?: string;
    } | undefined;
    scrapingStrategy: string;
    status?: string;
    url: string;
    createdAt?: number;
    updateAt?: number;
}
export interface Department {
    id: string;
    label: string;
}
export interface Job {
    department: string;
    url: string;
    id: string;
    title: string;
    location: string;
    _id: string;
    _updatedAt: number;
    companyId: string;
    company?: string;
    normalizedLocation?: string[];
    normalizedDepartment?: string;
    createdAt?: number;
    updatedAt?: number;
}
