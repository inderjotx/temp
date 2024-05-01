"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const usLocations = ["usa", "atlanta", "san francisco"];
const canadaLocations = ["canada"];
// Fullstory seems to be US/Canada only but it uses different variations of the
// terms US/Atlanta/Canada, etc... in its location so we need to account for it here.
// E.g.:
// - Atlanta, GA or Remote (USA or Canada)
// - Remote, San Francisco Bay Area
// - Atlanta, GA or Remote
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if (usLocations.some((usLocations) => location.toLowerCase().includes(usLocations))) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    if (canadaLocations.some((canadaLocation) => location.toLowerCase().includes(canadaLocation))) {
        normalizedLocation.push(data_api_1.locationIds.canada);
    }
    if (!normalizedLocation.length) {
        // Default to remote US only
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
