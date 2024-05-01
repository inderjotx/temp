// Slack puts an internal ID in front of the department, so let's remove it.
// E.g.:
// - 470 Recruiting

import { Job } from "types";

// - 310 Enterprise Account Executives
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    department: job.department.substring(job.department.indexOf(" ") + 1),
  };
}
