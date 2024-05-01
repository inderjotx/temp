"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
// Remote.com has only full-remote positions (with a "Anywhere" location)
function extractLocation() {
    return "Remote";
}
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        location: extractLocation(),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
