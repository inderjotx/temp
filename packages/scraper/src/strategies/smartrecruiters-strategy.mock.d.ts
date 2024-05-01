export declare const input: {
    offset: number;
    limit: number;
    totalFound: number;
    content: ({
        id: string;
        name: string;
        uuid: string;
        refNumber: string;
        company: {
            identifier: string;
            name: string;
        };
        releasedDate: string;
        location: {
            city: string;
            region: string;
            country: string;
            remote: boolean;
        };
        industry: {
            id: string;
            label: string;
        };
        department: {
            id: string;
            label: string;
        };
        function: {
            id: string;
            label: string;
        };
        typeOfEmployment: {
            label: string;
        };
        experienceLevel: {
            id: string;
            label: string;
        };
        customField: {
            fieldId: string;
            fieldLabel: string;
            valueId: string;
            valueLabel: string;
        }[];
        ref: string;
        creator: {
            name: string;
        };
        language: {
            code: string;
            label: string;
            labelNative: string;
        };
    } | {
        id: string;
        name: string;
        uuid: string;
        refNumber: string;
        company: {
            identifier: string;
            name: string;
        };
        releasedDate: string;
        location: {
            city: string;
            country: string;
            remote: boolean;
            region?: undefined;
        };
        industry: {
            id: string;
            label: string;
        };
        department: {
            id: string;
            label: string;
        };
        function: {
            id: string;
            label: string;
        };
        typeOfEmployment: {
            label: string;
        };
        experienceLevel: {
            id: string;
            label: string;
        };
        customField: {
            fieldId: string;
            fieldLabel: string;
            valueId: string;
            valueLabel: string;
        }[];
        ref: string;
        creator: {
            name: string;
        };
        language: {
            code: string;
            label: string;
            labelNative: string;
        };
    })[];
}[];
export declare const output: {
    department: string;
    url: string;
    id: string;
    title: string;
    location: string;
    _id: string;
    _updatedAt: number;
}[];
