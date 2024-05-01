/** @see https://docs.recruitee.com/reference#offers-1 */
import { Job } from "types";
export declare function getJobsFromRecruitee(recruiteeCompanyId: string): Promise<Job[]>;
