export declare const input: {
    total: number;
    results: {
        id: number;
        shortcode: string;
        title: string;
        remote: boolean;
        location: {
            country: string;
            countryCode: string;
            city: string;
            region: string;
        };
        state: string;
        isInternal: boolean;
        code: string;
        published: string;
        type: string;
        language: string;
        department: string[];
        accountUid: string;
        approvalStatus: string;
    }[];
};
export declare const output: {
    _updatedAt: number;
    department: string;
    id: string;
    location: string;
    title: string;
    url: string;
}[];
