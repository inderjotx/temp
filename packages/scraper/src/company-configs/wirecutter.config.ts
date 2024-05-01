import { Job } from "types";

function extractTitle(job: Job) {
  return job.title.replace(/\(Remote\)/, "").trim();
}

// Sometimes Wirecutter job offers have the location between parentheses in the
// title.
// E.g.: Engineering Manager, Wirecutter (Remote)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
  };
}

