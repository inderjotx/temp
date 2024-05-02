import { locationIds } from "@tokenjobs/data-api";
import { locationLooselyStartsWith } from "@tokenjobs/normalizer";

export function getNormalizedLocation({ location }: { location: string }) {

  const normalizedLocation: string[] = [];
  if (locationLooselyStartsWith(location, "united states")) {
    normalizedLocation.push(locationIds.us);
  }
  return normalizedLocation;
}
