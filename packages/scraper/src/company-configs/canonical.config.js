"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.applyPostScrapingCustomizations = void 0;
const data_api_1 = require("@remotebear/data-api");
// Canonical writes its remote locations this way:
// - Home based - EMEA
// - Home based - Americas
// - etc...
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        location: job.location.replace(/home based/i, "Remote"),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
const canonicalLocationToNormalizedLocation = {
    americas: [data_api_1.locationIds.us],
    emea: [data_api_1.locationIds.eu, data_api_1.locationIds.other],
    "americas, emea": [data_api_1.locationIds.eu, data_api_1.locationIds.us, data_api_1.locationIds.other],
    apac: [data_api_1.locationIds.australia, data_api_1.locationIds.other],
    worldwide: [data_api_1.locationIds.global],
};
function getNormalizedLocation({ location }) {
    let normalizedLocation = [];
    Object.entries(canonicalLocationToNormalizedLocation).forEach(([locationOption, locationOptionNormalizedLocation]) => {
        if (location.toLowerCase().includes(`remote - ${locationOption}`)) {
            normalizedLocation = [
                ...normalizedLocation,
                ...locationOptionNormalizedLocation,
            ];
        }
    });
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
