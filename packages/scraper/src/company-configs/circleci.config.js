"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
// CircleCI has the remote location between parenthesis or comma-separated in the location
// E.g.:
// - Remote (United States (East Coast), Canada (East Coast),Ireland, Germany or United Kingdom), Boston, Toronto, London
// - Remote (United States, Canada, United Kingdom, Ireland or Germany)
// - San Francisco, Denver, Boston, Toronto, Remote US, Remote Canada
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    // Parenthesis flow
    const remoteLocationMatchResult = location.match(new RegExp("\\((.*)\\)"));
    if (remoteLocationMatchResult && remoteLocationMatchResult[1]) {
        const remoteLocation = remoteLocationMatchResult && remoteLocationMatchResult[1];
        if (!remoteLocation) {
            return normalizedLocation;
        }
        if ((0, normalizer_1.locationLooselyIncludes)(remoteLocation, ["united states", "east coast"])) {
            normalizedLocation.push(data_api_1.locationIds.us);
        }
        if ((0, normalizer_1.locationLooselyIncludes)(remoteLocation, ["canada"])) {
            normalizedLocation.push(data_api_1.locationIds.canada);
        }
        if ((0, normalizer_1.locationLooselyIncludes)(remoteLocation, [
            "united kingdom",
            "ireland",
            "germany",
        ])) {
            normalizedLocation.push(data_api_1.locationIds.eu);
        }
        if ((0, normalizer_1.locationLooselyIncludes)(remoteLocation, ["japan"])) {
            normalizedLocation.push(data_api_1.locationIds.other);
        }
    }
    // Comma-separated flow
    else {
        const remoteLocations = location
            .split(/[-,;]/) // Split by these characters
            .map((x) => x.trim().toLowerCase())
            .filter((x) => x.startsWith("remote")) // Pick only locations that starts by "remote"
            .map((x) => x.replace(/Remote /gi, "")); // Remove the "remote" word
        if (remoteLocations.includes("us")) {
            normalizedLocation.push(data_api_1.locationIds.us);
        }
        if (remoteLocations.includes("canada")) {
            normalizedLocation.push(data_api_1.locationIds.canada);
        }
        if (remoteLocations.includes("eu") ||
            remoteLocations.includes("ireland") ||
            remoteLocations.includes("germany") ||
            remoteLocations.includes("uk")) {
            normalizedLocation.push(data_api_1.locationIds.eu);
        }
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
