import { Job } from "types";

// Gradle is remote-only, but it doesn't specify it in its job offers
function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    location: `Remote - ${job.location}`,
  };
}

export {
  applyPostScrapingCustomizations,
};
