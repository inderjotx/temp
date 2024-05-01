import { Job } from "types";

function extractTitle(job: Job) {
  return job.title.substr(0, job.title.indexOf("(")).trim();
}
function extractLocation(job: Job) {
  const regexp = /\(([^)]+)\)/;
  const result = regexp.exec(job.title);
  return result ? result[1].trim() : "Remote";
}

// Linear keeps the location info in the job title.
// E.g.:
// - Senior Product Designer (Remote US/EU Timezones)
// - Chief of Staff (Remote US Timezones)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
    location: extractLocation(job),
  };
}

