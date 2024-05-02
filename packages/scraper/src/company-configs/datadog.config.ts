import { locationIds } from "@tokenjobs/data-api";
import { locationLooselyIncludes } from "@tokenjobs/normalizer";

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation = [];
  if (locationLooselyIncludes(location, ["remote us", "remoteus"])) {
    normalizedLocation.push(locationIds.us);
  }
  if (locationLooselyIncludes(location, ["remote eu", "remoteeu"])) {
    normalizedLocation.push(locationIds.eu);
  }
  if (
    locationLooselyIncludes(location, [
      "remote rest of world",
      "remoterest of world",
    ])
  ) {
    normalizedLocation.push(locationIds.eu);
    normalizedLocation.push(locationIds.other);
  }
  return normalizedLocation;
}

