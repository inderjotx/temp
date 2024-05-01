import { locationIds } from "@remotebear/data-api";

// Airtable is US only
export function getNormalizedLocation() {
  const normalizedLocation: string[] = [];
  normalizedLocation.push(locationIds.us);
  return normalizedLocation;
}

