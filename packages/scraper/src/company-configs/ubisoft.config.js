"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
function extractTitle(job) {
    return (job.title.substr(0, job.title.toLowerCase().indexOf("- remote")).trim() ||
        job.title.trim());
}
// Sometimes Ubisoft job offers have the REMOTE label in the title
// E.g.: Lead UI Engineer - Remote
// E.g.: Online Engineer - REMOTE/ONSITE
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        title: extractTitle(job),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
