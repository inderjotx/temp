import { locationIds } from "@remotebear/data-api";
import { locationLooselyStartsWith } from "@remotebear/normalizer";

export function getNormalizedLocation({ location }: { location: string }) {

  const normalizedLocation: string[] = [];
  if (locationLooselyStartsWith(location, "united states")) {
    normalizedLocation.push(locationIds.us);
  }
  return normalizedLocation;
}
