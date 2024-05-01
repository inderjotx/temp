import { locationIds } from "@remotebear/data-api";
import { locationLooselyIncludes } from "@remotebear/normalizer";

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation: string[] = [];
  if (locationLooselyIncludes(location, ["remote north america"])) {
    normalizedLocation.push(locationIds.us);
  }
  if (locationLooselyIncludes(location, "remote europe")) {
    normalizedLocation.push(locationIds.eu);
  }
  if (locationLooselyIncludes(location, ["remote emea"])) {
    normalizedLocation.push(locationIds.eu);
    normalizedLocation.push(locationIds.other);
  }
  return normalizedLocation;
}

