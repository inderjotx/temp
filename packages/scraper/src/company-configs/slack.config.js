"use strict";
// Slack puts an internal ID in front of the department, so let's remove it.
// E.g.:
// - 470 Recruiting
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPostScrapingCustomizations = void 0;
// - 310 Enterprise Account Executives
function applyPostScrapingCustomizations(job) {
    return {
        ...job,
        department: job.department.substring(job.department.indexOf(" ") + 1),
    };
}
exports.applyPostScrapingCustomizations = applyPostScrapingCustomizations;
