"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.applyPostScrapingCustomizations = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
// Sometimes Mozilla job offers have internal location mappings
// E.g.: Remote US(2) & (3)
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        location: job.location.replace(/[()\d&]/g, "").trim(),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote us"])) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote canada"])) {
        normalizedLocation.push(data_api_1.locationIds.canada);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote germany", "remote uk"])) {
        normalizedLocation.push(data_api_1.locationIds.eu);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
