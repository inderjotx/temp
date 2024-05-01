"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote us", "remoteus"])) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote eu", "remoteeu"])) {
        normalizedLocation.push(data_api_1.locationIds.eu);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, [
        "remote rest of world",
        "remoterest of world",
    ])) {
        normalizedLocation.push(data_api_1.locationIds.eu);
        normalizedLocation.push(data_api_1.locationIds.other);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
