export declare const input: {
    departments: ({
        id: number;
        name: string;
        parent_id: number;
        child_ids: never[];
        jobs: never[];
    } | {
        id: number;
        name: string;
        parent_id: null;
        child_ids: number[];
        jobs: {
            absolute_url: string;
            data_compliance: {
                type: string;
                requires_consent: boolean;
                retention_period: null;
            }[];
            internal_job_id: number;
            location: {
                name: string;
            };
            metadata: never[];
            id: number;
            updated_at: string;
            requisition_id: string;
            title: string;
        }[];
    } | {
        id: number;
        name: string;
        parent_id: null;
        child_ids: never[];
        jobs: {
            absolute_url: string;
            data_compliance: {
                type: string;
                requires_consent: boolean;
                retention_period: null;
            }[];
            education: string;
            internal_job_id: number;
            location: {
                name: string;
            };
            metadata: never[];
            id: number;
            updated_at: string;
            requisition_id: string;
            title: string;
        }[];
    })[];
};
export declare const output: {
    _id: number;
    _updatedAt: number;
    department: string;
    id: string;
    location: string;
    title: string;
    url: string;
}[];
