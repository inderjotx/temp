import { locationIds } from "@remotebear/data-api";
import { locationLooselyIncludes } from "@remotebear/normalizer";
import { Job } from "types";

// Sometimes Mozilla job offers have internal location mappings
// E.g.: Remote US(2) & (3)
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    location: job.location.replace(/[()\d&]/g, "").trim(),
  };
}

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation: string[] = [];
  if (locationLooselyIncludes(location, ["remote us"])) {
    normalizedLocation.push(locationIds.us);
  }
  if (locationLooselyIncludes(location, ["remote canada"])) {
    normalizedLocation.push(locationIds.canada);
  }
  if (locationLooselyIncludes(location, ["remote germany", "remote uk"])) {
    normalizedLocation.push(locationIds.eu);
  }
  return normalizedLocation;
}

