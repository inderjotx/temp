import { Job } from "types";

function extractTitle(job: Job) {
  return job.title.substr(0, job.title.indexOf("(")).trim() || job.title.trim();
}

function extractLocation(job: Job) {
  const regexp = /\(([^)]+)\)/;
  const regexpResult = regexp.exec(job.title);
  const location =
    regexpResult && regexpResult[1] ? regexpResult[1] : job.location;
  return location.trim();
}

// Sometimes SourceGraph job offers have the location between parentheses in the
// title.
// E.g.: Head of Customer Success, East (Remote)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
    location: extractLocation(job),
  };
}

