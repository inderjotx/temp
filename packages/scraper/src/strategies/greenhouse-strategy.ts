import { Job } from "types";

export async function getJobsFromGreenhouse(greenhouseCompanyId: string): Promise<Job[]> {
  const responseRaw = await fetch(
    `https://api.greenhouse.io/v1/boards/${greenhouseCompanyId}/embed/departments`
  );
  const response = await responseRaw.json();
  const data = response.departments.flatMap((department: any) => {
    return department.jobs.map((jobInfo: any) => {
      return {
        department: department.name,
        url: jobInfo.absolute_url,
        id: `${jobInfo.id}`,
        location: jobInfo.location.name,
        title: jobInfo.title,
        _id: jobInfo.internal_job_id,
        _updatedAt: new Date(jobInfo.updated_at).getTime(),
      };
    });
  });
  return data;
}
