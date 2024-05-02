import locationsData from "@tokenjobs/data/locations/locations-data.json"

export const locationIds = locationsData.reduce((acc, location) => {
  acc[location.id] = location.id;
  return acc;
}, {} as Record<string, string>);

export const allLocationsById = locationsData.reduce((acc, location) => {
  acc[location.id] = location;
  return acc;
}, {} as Record<string, typeof locationsData[0]>);


export const allLocations = locationsData