import { Job } from "types";

function extractTitle(job: Job) {
  if (!job.title.includes("(Remote")) {
    return job.title;
  }
  return job.title.substr(0, job.title.indexOf("(Remote")).trim();
}

function extractLocation(job: Job) {
  const regexp = /\((Remote[^)]+)\)/;
  const result = regexp.exec(job.title);
  return result ? result[1].trim() : "Remote";
}

// Kraken sometimes keeps the location info in the job title.
// E.g.:
// - Senior Writer (Remote - Europe)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
    location: extractLocation(job),
  };
}

