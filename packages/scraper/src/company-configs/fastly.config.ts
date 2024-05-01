import { locationIds } from "@remotebear/data-api";

import { sanitizeLocation, locationKeywordsLooselyMatch } from "@remotebear/normalizer";


// Fastly location is composed of semicolon-separated sub-locations.
// Sub-locations are marked as remote with "(remote)".
// For example:
// - "Germany (Remote); London, United Kingdom; Spain (Remote)"
// - "Australia (Remote); Tokyo, Japan"
// - "US Central (Remote); US East (Remote)"
function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation: string[] = [];
  const remoteSublocations = location
    .toLowerCase()
    .split(";")
    .map(sanitizeLocation);
  remoteSublocations.forEach((sublocation) => {
    if (
      locationKeywordsLooselyMatch(sublocation, [
        "remote us",
        "remote united states",
      ])
    ) {
      normalizedLocation.push(locationIds.us);
    }
    if (
      locationKeywordsLooselyMatch(sublocation, [
        "remote germany",
        "remote spain",
        "remote united kingdom",
        "remote london",
      ])
    ) {
      normalizedLocation.push(locationIds.eu);
    }
    if (locationKeywordsLooselyMatch(sublocation, ["remote australia"])) {
      normalizedLocation.push(locationIds.australia);
    }
    if (locationKeywordsLooselyMatch(sublocation, ["remote canada"])) {
      normalizedLocation.push(locationIds.canada);
    }
  });
  return normalizedLocation;
}

export {
  getNormalizedLocation,
};
