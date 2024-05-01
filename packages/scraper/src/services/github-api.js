"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewJobsDataPullRequest = void 0;
const rest_1 = require("@octokit/rest");
const octokit_plugin_create_pull_request_1 = require("octokit-plugin-create-pull-request");
const data_api_1 = require("@remotebear/data-api");
const prettier_1 = __importDefault(require("prettier"));
const config_1 = require("../config");
function toPrettyIsoDate(date) {
    const pad = (n) => (n < 10 ? "0" + n : String(n));
    return (date.getUTCFullYear() +
        "-" +
        pad(date.getUTCMonth() + 1) +
        "-" +
        pad(date.getUTCDate()) +
        "T" +
        pad(date.getUTCHours()) +
        ":" +
        pad(date.getUTCMinutes()) +
        ":" +
        pad(date.getUTCSeconds()) +
        "Z");
}
const MyOctokit = rest_1.Octokit.plugin(octokit_plugin_create_pull_request_1.createPullRequest);
const octokit = new MyOctokit({
    auth: config_1.GITHUB_API_TOKEN,
});
function buildMarkdownTable({ headers, body }) {
    const tableHeaders = `| ${headers.join(" | ")} |`;
    const tableHeaderSeparators = `| ${headers.map(() => "---").join(" | ")} |`;
    const tableRows = body
        .map((item) => `| ${headers.map((header) => item[header]).join(" | ")} |`)
        .join("\n");
    return `\n\n${tableHeaders}\n${tableHeaderSeparators}\n${tableRows}`;
}
function buildPullRequestBody({ addedJobs, removedJobs, scrapingErrors, formattedDate, invalidLocations, }) {
    const jobTableHeader = ["Company", "Title", "Loc.", "Norm. Loc."];
    const buildJobTableItem = (job) => ({
        ["Company"]: ((0, data_api_1.getCompany)(job.company || job.companyId) || {}).name ||
            `${job.companyId} - (MISSING)`,
        ["Title"]: job.title,
        ["Loc."]: job.location,
        ["Norm. Loc."]: job.normalizedLocation && job.normalizedLocation.length > 0
            ? job.normalizedLocation.map((x) => `\`${x}\``).join(", ")
            : "⚠️",
    });
    let body = `## Auto-update ${formattedDate}\n`;
    if (Object.keys(scrapingErrors).length) {
        body += `\n### ⚠️ Scraping errors detected  \n`;
        Object.entries(scrapingErrors).forEach(([companyId, error]) => {
            const company = (0, data_api_1.getCompany)(companyId);
            body += `- __${company.name}__: \`${error.message}\`  `;
        });
        body += `  \n`;
    }
    if (addedJobs.length > 0) {
        body += `\n### Added ${addedJobs.length} new jobs  `;
        body += `${buildMarkdownTable({
            headers: jobTableHeader,
            body: addedJobs.map(buildJobTableItem),
        })}`;
    }
    body += `  \n`;
    if (removedJobs.length > 0) {
        body += `\n### Removed ${removedJobs.length} existing jobs  `;
        body += `${buildMarkdownTable({
            headers: jobTableHeader,
            body: removedJobs.map(buildJobTableItem),
        })}`;
    }
    if (invalidLocations.length > 0) {
        body += `\n### ⚠️ Invalid locations  \n`;
        invalidLocations.forEach((invalidLocation) => {
            const company = (0, data_api_1.getCompany)(invalidLocation.companyId);
            body += `- __${company.name}__: \`${invalidLocation.location}\` (${invalidLocation.count}) `;
            body += `  \n`;
        });
    }
    return body;
}
async function createNewJobsDataPullRequest({ jobs, addedJobs, removedJobs, scrapingErrors, invalidLocations, }) {
    const date = new Date();
    const formattedDate = toPrettyIsoDate(date);
    const files = { [data_api_1.jobsFilePath]: "", [`${data_api_1.jobsHistoryDir}/jobs-history.${formattedDate}.json`]: "" };
    files[data_api_1.jobsFilePath] = prettier_1.default.format(JSON.stringify(jobs), {
        printWidth: 1000,
        parser: "json",
    });
    if (removedJobs.length) {
        const jobsHistoryPath = `${data_api_1.jobsHistoryDir}/jobs-history.${formattedDate}.json`;
        files[jobsHistoryPath] = JSON.stringify(removedJobs);
    }
    const pullRequest = await octokit.createPullRequest({
        owner: config_1.GITHUB_OWNER,
        repo: config_1.GITHUB_REPO,
        title: `Auto-update ${formattedDate}`,
        body: buildPullRequestBody({
            addedJobs,
            removedJobs,
            scrapingErrors,
            formattedDate,
            invalidLocations,
        }),
        head: `auto-update/${Date.now()}`,
        changes: [
            {
                files,
                commit: `Auto-update ${formattedDate}`,
            },
        ],
    });
    return pullRequest;
}
exports.createNewJobsDataPullRequest = createNewJobsDataPullRequest;
