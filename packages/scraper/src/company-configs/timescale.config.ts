import { locationIds } from "@tokenjobs/data-api";

// E.g.:
// - Fully remote (UTC-8 to UTC+5.5)
// - Anywhere
// - Remote
function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation: string[] = [];
  if (location === "Fully remote (UTC-8 to UTC+5.5)") {
    normalizedLocation.push(locationIds.us);
  }
  return normalizedLocation;
}

export {
  getNormalizedLocation,
};
