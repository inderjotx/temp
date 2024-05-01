import { Job } from "types";

function extractTitle(job: Job) {
  return (
    job.title.substr(0, job.title.toLowerCase().indexOf("- remote")).trim() ||
    job.title.trim()
  );
}

// Sometimes Ubisoft job offers have the REMOTE label in the title
// E.g.: Lead UI Engineer - Remote
// E.g.: Online Engineer - REMOTE/ONSITE
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
  };
}

