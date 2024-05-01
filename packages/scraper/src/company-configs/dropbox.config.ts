import { locationIds } from "@remotebear/data-api";

const dropboxLocationToNormalizedLocation = {
  us: [locationIds.us],
  emea: [locationIds.eu, locationIds.other],
  apac: [locationIds.australia, locationIds.other],
  israel: [locationIds.other],
  apj: [locationIds.other],
};

// Dropbox writes its remote locations this way:
// - Tokyo, Japan; Remote - APAC
// - Austin, TX; Remote - US
// - etc...
export function getNormalizedLocation({ location }: { location: string }) {
  let normalizedLocation: string[] = [];
  Object.entries(dropboxLocationToNormalizedLocation).forEach(
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