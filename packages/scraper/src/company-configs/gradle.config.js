"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
// Gradle is remote-only, but it doesn't specify it in its job offers
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        location: `Remote - ${job.location}`,
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
