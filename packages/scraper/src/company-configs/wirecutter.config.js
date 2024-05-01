"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
function extractTitle(job) {
    return job.title.replace(/\(Remote\)/, "").trim();
}
// Sometimes Wirecutter job offers have the location between parentheses in the
// title.
// E.g.: Engineering Manager, Wirecutter (Remote)
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        title: extractTitle(job),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
