"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.applyPostScrapingCustomizations = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
function extractTitle(job) {
    return job.title.substr(0, job.title.indexOf("(")).trim() || job.title.trim();
}
function extractLocation(job) {
    const regexp = /\(([^)]+)\)/;
    const regexpResult = regexp.exec(job.title);
    const location = regexpResult && regexpResult[1]
        ? [regexpResult[1], job.location].join(", ")
        : job.location;
    return location.trim();
}
// Sometimes Atlassian job offers have the location between parentheses in the
// title.
// E.g.: Senior Engineering Manager, Bitbucket Cloud (Austin or Remote)
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        title: extractTitle(job),
        location: extractLocation(job),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if ((0, normalizer_1.locationLooselyIncludes)(location, [
        "remote within poland",
        "remote gdansk poland",
        "remote germany",
        "remote amsterdam",
        "remote uk",
    ])) {
        normalizedLocation.push(data_api_1.locationIds.eu);
    }
    else {
        // Default to use
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
