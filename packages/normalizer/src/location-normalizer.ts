

import { locationIds, allLocationPatterns } from "@tokenjobs/data-api";


import {
  uniq,
  locationLooselyMatches,
  locationLooselyStartsWith,
  locationLooselyEndsWith,
  locationKeywordsLooselyMatch,
  getLocation,
  remoteWrongUS,
} from "./utils";

function sanitizeNormalizedLocation(normalizedLocation: string[]) {
  return uniq(normalizedLocation.filter((x) => x !== undefined || x !== null));
}

function getNormalizedLocation(job: { location: string, companyId?: string }, companyConfigs: Record<string, any>) {
  const { location } = job;
  let normalizedLocation: string[] = [];

  // Try to get the normalized location based on the company customizations
  const companyConfig = companyConfigs && job.companyId && companyConfigs[job.companyId];
  if (companyConfig && companyConfig.getNormalizedLocation) {
    normalizedLocation = companyConfig.getNormalizedLocation(job);
    if (normalizedLocation.length) {
      return sanitizeNormalizedLocation(normalizedLocation);
    }
  }



  // Try to get the normalized location based on the location patterns
  // const patternTypesToFuncs = [
  //   { type: "match", func: locationLooselyMatches },
  //   { type: "starts-with", func: locationLooselyStartsWith },
  //   { type: "ends-with", func: locationLooselyEndsWith },
  //   { type: "keywords", func: locationKeywordsLooselyMatch },
  // ];
  // for (const { type, func } of patternTypesToFuncs) {
  //   const matchedPattern = allLocationPatterns
  //     .filter((x) => x.type === type)
  //     .find((x) => func(location, x.pattern));
  //   if (matchedPattern) {
  //     normalizedLocation = sanitizeNormalizedLocation(
  //       matchedPattern.locationIds
  //     );
  //     break;
  //   }
  // }


  allLocationPatterns.forEach((item) => {

    const doesPatternMatch = getLocation(location, item.pattern);

    if (doesPatternMatch) {
      normalizedLocation.push(...item.locationIds)
    }

  })


  normalizedLocation = remoteWrongUS(normalizedLocation);



  // If global or not found, default to "companyConfig.defaultGlobalLocation"
  if (
    !normalizedLocation.length ||
    (normalizedLocation.length === 1 &&
      normalizedLocation[0] === locationIds.global)
  ) {
    if (companyConfig && companyConfig.defaultGlobalLocation) {
      normalizedLocation = [companyConfig.defaultGlobalLocation];
    }
  }

  return sanitizeNormalizedLocation(normalizedLocation);
}

export {
  locationIds,
  getNormalizedLocation,
};
