import { Job } from "types";

function extractTitle(responseJob: Job) {
  return responseJob.title.substr(0, responseJob.title.indexOf("(")).trim();
}

function extractLocation(responseJob: Job) {
  const regexp = /\(([^)]+)\)/;
  return regexp.exec(responseJob.title)?.[1].trim();
}

// DuckDuckGo job offers have the location between parentheses in the title.
// E.g.: Lead, Product (Remote)
export async function scrapeJobs() {
  const response = await fetch(`https://duckduckgo.com/jobs.js`);
  const data = await response.json();
  const result = data.offers.map((job: any) => {
    return {
      department: job.department,
      url: job.careers_apply_url,
      id: `${job.id}`,
      location: extractLocation(job),
      title: extractTitle(job),
      _id: job.id,
      _updatedAt: new Date(job.created_at).getTime(),
    };
  });
  return result;
}

