import { Job } from "types";

export async function getJobsFromPersonio(version: number, personioCompanyId: string): Promise<Job[]> {
  let url;
  if (version === 1) {
    url = `https://${personioCompanyId}.jobs.personio.de/search.json`;
  } else if (version === 2) {
    url = `https://${personioCompanyId}-jobs.personio.de/api/v2/get-search-data/`;
  } else {
    console.error("Missing Personio version or not exists");
    return [];
  }

  const responseRaw = await fetch(url);
  const response = await responseRaw.json();

  const data = response.map((jobInfo: any) => ({
    department: jobInfo.department,
    url: `https://${personioCompanyId}-jobs.personio.de/job/${jobInfo.id}`,
    id: `${jobInfo.id}`,
    location: jobInfo.office,
    title: jobInfo.name,
  }));

  return data;
}
