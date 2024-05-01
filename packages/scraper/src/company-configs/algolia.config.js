"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const euLocations = [
    "paris",
    "london",
    "dublin",
    "czech republic",
    "berlin",
    "buchares",
];
const usLocations = ["new york", "east coast"];
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if (euLocations.some((euLocation) => location.toLowerCase().includes(euLocation))) {
        normalizedLocation.push(data_api_1.locationIds.eu);
    }
    if (usLocations.some((usLocation) => location.toLowerCase().includes(usLocation))) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
// Aloglia uses a pipe to separate different locations. Since the pipe looks
// pretty ugly and clashes with the Github post format, let's replace it with
// a comma.
// E.g.: "Paris | London | Remote"
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        location: job.location.replace(/\s\|\s/g, ", "),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
