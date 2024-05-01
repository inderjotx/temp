/** @see https://docs.recruitee.com/reference#offers-1 */

import { Job } from "types";

export async function getJobsFromRecruitee(recruiteeCompanyId: string): Promise<Job[]> {
  const responseRaw = await fetch(
    `https://${recruiteeCompanyId}.recruitee.com/api/offers`
  );
  const response = await responseRaw.json();
  const data = response.offers.map((jobInfo: any) => ({
    department: jobInfo.department,
    url: jobInfo.careers_url,
    id: `${jobInfo.id}`,
    location: jobInfo.remote ? "Remote" : jobInfo.location,
    title: jobInfo.title,
    _updatedAt: new Date(jobInfo.created_at).getTime(),
  }));
  return data;
}