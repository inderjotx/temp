import { Job } from "types";

import { locationIds } from "@tokenjobs/data-api";

const euLocations = [
  "paris",
  "london",
  "dublin",
  "czech republic",
  "berlin",
  "buchares",
];

const usLocations = ["new york", "east coast"];

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation: string[] = [];

  if (
    euLocations.some((euLocation) =>
      location.toLowerCase().includes(euLocation)
    )
  ) {
    normalizedLocation.push(locationIds.eu);
  }

  if (
    usLocations.some((usLocation) =>
      location.toLowerCase().includes(usLocation)
    )
  ) {
    normalizedLocation.push(locationIds.us);
  }

  return normalizedLocation;
}

// Aloglia uses a pipe to separate different locations. Since the pipe looks
// pretty ugly and clashes with the Github post format, let's replace it with
// a comma.
// E.g.: "Paris | London | Remote"
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    location: job.location.replace(/\s\|\s/g, ", "),
  };
}

