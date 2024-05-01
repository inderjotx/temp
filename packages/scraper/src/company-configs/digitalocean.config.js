"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
// Digialocean locations often look like this
// - Remote: U.S. & Canada or Office Locations: Cambridge - MA, New York - NY, Palo Alto - CA
// - Remote: U.S. & Canada
// - Remote: U.S. or Office Locations: Cambridge - MA, New York - NY, Palo Alto - CA
// So we can check in advance if they start with a specific pattern.
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if (location.includes("Remote - Global")) {
        normalizedLocation.push(data_api_1.locationIds.global);
        return normalizedLocation;
    }
    const firstPartOfLocation = location.split(" or")[0];
    if ((0, normalizer_1.locationKeywordsLooselyMatch)(firstPartOfLocation, ["remote us"])) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    if ((0, normalizer_1.locationKeywordsLooselyMatch)(firstPartOfLocation, ["remote us canada"])) {
        normalizedLocation.push(data_api_1.locationIds.canada);
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
