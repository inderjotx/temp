import { Job } from "types";

// Remote.com has only full-remote positions (with a "Anywhere" location)
function extractLocation() {
  return "Remote";
}

export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    location: extractLocation(),
  };
}

