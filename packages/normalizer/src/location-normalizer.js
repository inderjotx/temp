"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.locationIds = void 0;
const data_api_1 = require("@remotebear/data-api");
Object.defineProperty(exports, "locationIds", { enumerable: true, get: function () { return data_api_1.locationIds; } });
const utils_1 = require("./utils");
function sanitizeNormalizedLocation(normalizedLocation) {
    return (0, utils_1.uniq)(normalizedLocation).sort();
}
function getNormalizedLocation(job, companyConfigs) {
    const { location } = job;
    let normalizedLocation = [];
    // Try to get the normalized location based on the company customizations
    const companyConfig = companyConfigs && job.companyId && companyConfigs[job.companyId];
    if (companyConfig && companyConfig.getNormalizedLocation) {
        normalizedLocation = companyConfig.getNormalizedLocation(job);
        if (normalizedLocation.length) {
            return sanitizeNormalizedLocation(normalizedLocation);
        }
    }
    // Try to get the normalized location based on the location patterns
    const patternTypesToFuncs = [
        { type: "match", func: utils_1.locationLooselyMatches },
        { type: "starts-with", func: utils_1.locationLooselyStartsWith },
        { type: "ends-with", func: utils_1.locationLooselyEndsWith },
        { type: "keywords", func: utils_1.locationKeywordsLooselyMatch },
    ];
    for (const { type, func } of patternTypesToFuncs) {
        const matchedPattern = data_api_1.allLocationPatterns
            .filter((x) => x.type === type)
            .find((x) => func(location, x.pattern));
        if (matchedPattern) {
            normalizedLocation = sanitizeNormalizedLocation(matchedPattern.locationIds);
            break;
        }
    }
    // If global or not found, default to "companyConfig.defaultGlobalLocation"
    if (!normalizedLocation.length ||
        (normalizedLocation.length === 1 &&
            normalizedLocation[0] === data_api_1.locationIds.global)) {
        if (companyConfig && companyConfig.defaultGlobalLocation) {
            normalizedLocation = [companyConfig.defaultGlobalLocation];
        }
    }
    return sanitizeNormalizedLocation(normalizedLocation);
}
exports.getNormalizedLocation = getNormalizedLocation;
