import { locationIds } from "@remotebear/data-api";

// We need a light variation of the Greenhouse strategy in order to fetch
// the offices as well, because Discord keeps the "remote" info in the office
// names... which are not fetched by default with our standard strategy.
export async function scrapeJobs() {
  const responseRaw = await fetch(
    `https://api.greenhouse.io/v1/boards/discord/embed/offices`
  );
  const response = await responseRaw.json();
  const data = response.offices
    .filter((office: any) => office.name.toLowerCase().includes("remote"))
    .flatMap((office: any) => {
      return office.departments.flatMap((department: any) => {
        return department.jobs.map((jobInfo: any) => {
          return {
            department: department.name,
            url: jobInfo.absolute_url,
            id: `${jobInfo.id}`,
            location: office.name,
            title: jobInfo.title,
            _id: jobInfo.internal_job_id,
            _updatedAt: new Date(jobInfo.updated_at).getTime(),
          };
        });
      });
    });
  return data;
}

export const defaultGlobalLocation = locationIds.us;

