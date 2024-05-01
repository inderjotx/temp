import { locationIds } from "@remotebear/data-api";
declare function getNormalizedLocation(job: {
    location: string;
    companyId?: string;
}, companyConfigs: Record<string, any>): string[];
export { locationIds, getNormalizedLocation, };
