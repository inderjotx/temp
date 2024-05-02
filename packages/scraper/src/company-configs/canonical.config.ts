import { Job } from "types";

import { locationIds } from "@tokenjobs/data-api";

// Canonical writes its remote locations this way:
// - Home based - EMEA
// - Home based - Americas
// - etc...
export function applyPostScrapingCustomizations(job: Job) {
  return {
    ...job,
    location: job.location.replace(/home based/i, "Remote"),
  };
}

const canonicalLocationToNormalizedLocation = {
  americas: [locationIds.us],
  emea: [locationIds.eu, locationIds.other],
  "americas, emea": [locationIds.eu, locationIds.us, locationIds.other],
  apac: [locationIds.australia, locationIds.other],
  worldwide: [locationIds.global],
};

export function getNormalizedLocation({ location }: { location: string }) {
  let normalizedLocation: string[] = [];
  Object.entries(canonicalLocationToNormalizedLocation).forEach(
    ([locationOption, locationOptionNormalizedLocation]) => {
      if (location.toLowerCase().includes(`remote - ${locationOption}`)) {
        normalizedLocation = [
          ...normalizedLocation,
          ...locationOptionNormalizedLocation,
        ];
      }
    }
  );
  return normalizedLocation;
}

