"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsHistoryDir = exports.jobsFilePath = exports.allJobs = exports.buildUpdatedJobs = exports.writeTempCompanyJobs = exports.getTempCompanyJobs = exports.getTempCompanyJobsPath = exports.writeJobs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prettier_1 = __importDefault(require("prettier"));
const jobs_data_json_1 = __importDefault(require("@remotebear/data/jobs/jobs-data.json"));
function writeJobs(jobs) {
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "../../data/jobs/jobs-data.json"), prettier_1.default.format(JSON.stringify(jobs), {
        printWidth: 1000,
        parser: "json",
    }));
}
exports.writeJobs = writeJobs;
function getTempCompanyJobsPath(companyId) {
    return `../../data/jobs/jobs-data.${companyId}.temp.json`;
}
exports.getTempCompanyJobsPath = getTempCompanyJobsPath;
function getTempCompanyJobs(companyId) {
    return require(getTempCompanyJobsPath(companyId));
}
exports.getTempCompanyJobs = getTempCompanyJobs;
function writeTempCompanyJobs(companyId, jobs) {
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, getTempCompanyJobsPath(companyId)), JSON.stringify(jobs));
}
exports.writeTempCompanyJobs = writeTempCompanyJobs;
function buildUpdatedJobs({ previousJobs, currentJobs, skippedCompanyIds }) {
    const removedJobs = previousJobs.filter((previousJob) => {
        if (skippedCompanyIds.includes(previousJob.companyId)) {
            return false;
        }
        const currentJobIds = currentJobs.map((currentJob) => currentJob.id);
        return !currentJobIds.includes(previousJob.id);
    });
    const addedJobs = [];
    const previousJobsFromSkippedCompanies = previousJobs.filter((job) => skippedCompanyIds.includes(job.companyId));
    const jobs = currentJobs
        .map((currentJob) => {
        const previousJob = previousJobs.find((previousJob) => currentJob.id === previousJob.id);
        const job = {
            ...currentJob,
            createdAt: (previousJob && previousJob.createdAt) ||
                currentJob._updatedAt ||
                Date.now(),
        };
        if (!previousJob) {
            addedJobs.push(job);
        }
        return job;
    })
        .concat(previousJobsFromSkippedCompanies)
        .sort((a, b) => {
        // Sort jobs by "createdAt" and eventually "id"
        if (a.createdAt !== b.createdAt) {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        return a.id < b.id ? 1 : -1;
    });
    return {
        jobs,
        removedJobs,
        addedJobs,
        skippedJobs: previousJobsFromSkippedCompanies,
    };
}
exports.buildUpdatedJobs = buildUpdatedJobs;
exports.allJobs = jobs_data_json_1.default;
exports.jobsFilePath = "packages/data/jobs/jobs-data.json";
exports.jobsHistoryDir = "packages/data/jobs-history";
