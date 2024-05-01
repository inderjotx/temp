"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
function extractTitle(job) {
    if (!job.title.includes("(Remote")) {
        return job.title;
    }
    return job.title.substr(0, job.title.indexOf("(Remote")).trim();
}
function extractLocation(job) {
    const regexp = /\((Remote[^)]+)\)/;
    const result = regexp.exec(job.title);
    return result ? result[1].trim() : "Remote";
}
// Kraken sometimes keeps the location info in the job title.
// E.g.:
// - Senior Writer (Remote - Europe)
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        title: extractTitle(job),
        location: extractLocation(job),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
