"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
// Fastly location is composed of semicolon-separated sub-locations.
// Sub-locations are marked as remote with "(remote)".
// For example:
// - "Germany (Remote); London, United Kingdom; Spain (Remote)"
// - "Australia (Remote); Tokyo, Japan"
// - "US Central (Remote); US East (Remote)"
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    const remoteSublocations = location
        .toLowerCase()
        .split(";")
        .map(normalizer_1.sanitizeLocation);
    remoteSublocations.forEach((sublocation) => {
        if ((0, normalizer_1.locationKeywordsLooselyMatch)(sublocation, [
            "remote us",
            "remote united states",
        ])) {
            normalizedLocation.push(data_api_1.locationIds.us);
        }
        if ((0, normalizer_1.locationKeywordsLooselyMatch)(sublocation, [
            "remote germany",
            "remote spain",
            "remote united kingdom",
            "remote london",
        ])) {
            normalizedLocation.push(data_api_1.locationIds.eu);
        }
        if ((0, normalizer_1.locationKeywordsLooselyMatch)(sublocation, ["remote australia"])) {
            normalizedLocation.push(data_api_1.locationIds.australia);
        }
        if ((0, normalizer_1.locationKeywordsLooselyMatch)(sublocation, ["remote canada"])) {
            normalizedLocation.push(data_api_1.locationIds.canada);
        }
    });
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
