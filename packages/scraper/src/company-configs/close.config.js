"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.applyPostScrapingCustomizations = void 0;
const data_api_1 = require("@remotebear/data-api");
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
// Close's remote job offers have the location between parentheses in the
// title.
// E.g.:
// - Customer Success Associate - Americas (100% Remote)
// - Software Engineer - Backend/Python (Americas & European time zones -- 100% Remote)
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
    if (location.toLowerCase().includes("americas & european")) {
        normalizedLocation.push(data_api_1.locationIds.eu);
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    else if (location.toLowerCase().includes("americas") ||
        location.toLowerCase().includes("united states")) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    else if (location.toLowerCase().includes("europe")) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
