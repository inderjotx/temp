import { locationIds } from "@remotebear/data-api";
import { locationLooselyIncludes } from "@remotebear/normalizer";
import { Job } from "types";

function extractTitle(job: Job) {
  return job.title.substr(0, job.title.indexOf("(")).trim() || job.title.trim();
}

function extractLocation(job: Job) {
  const regexp = /\(([^)]+)\)/;
  const regexpResult = regexp.exec(job.title);
  const location =
    regexpResult && regexpResult[1]
      ? [regexpResult[1], job.location].join(", ")
      : job.location;
  return location.trim();
}

// Sometimes Atlassian job offers have the location between parentheses in the
// title.
// E.g.: Senior Engineering Manager, Bitbucket Cloud (Austin or Remote)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    title: extractTitle(job),
    location: extractLocation(job),
  };
}

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation = [];

  if (
    locationLooselyIncludes(location, [
      "remote within poland",
      "remote gdansk poland",
      "remote germany",
      "remote amsterdam",
      "remote uk",
    ])
  ) {
    normalizedLocation.push(locationIds.eu);
  } else {
    // Default to use
    normalizedLocation.push(locationIds.us);
  }
  return normalizedLocation;
}
