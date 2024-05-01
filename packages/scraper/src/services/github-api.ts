import { Octokit } from "@octokit/rest";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { getCompany, jobsFilePath, jobsHistoryDir } from "@remotebear/data-api";
import prettier from "prettier";
import { GITHUB_API_TOKEN, GITHUB_OWNER, GITHUB_REPO } from "../config";
import { Job } from 'types';


function toPrettyIsoDate(date: Date): string {
  const pad = (n: number): string => (n < 10 ? "0" + n : String(n));
  return (
    date.getUTCFullYear() +
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
    "Z"
  );
}

const MyOctokit = Octokit.plugin(createPullRequest);

const octokit = new MyOctokit({
  auth: GITHUB_API_TOKEN,
});



interface TableOptions {
  headers: string[];
  body: any[];
}


function buildMarkdownTable({ headers, body }: TableOptions) {
  const tableHeaders = `| ${headers.join(" | ")} |`;
  const tableHeaderSeparators = `| ${headers.map(() => "---").join(" | ")} |`;
  const tableRows = body
    .map((item) => `| ${headers.map((header) => item[header]).join(" | ")} |`)
    .join("\n");
  return `\n\n${tableHeaders}\n${tableHeaderSeparators}\n${tableRows}`;
}


interface BuildPullRequestBodyParams {
  addedJobs: Job[];
  removedJobs: Job[];
  scrapingErrors: Record<string, Error>;
  formattedDate: string;
  invalidLocations: any[];
}

function buildPullRequestBody({
  addedJobs,
  removedJobs,
  scrapingErrors,
  formattedDate,
  invalidLocations,
}: BuildPullRequestBodyParams) {


  const jobTableHeader = ["Company", "Title", "Loc.", "Norm. Loc."];

  const buildJobTableItem = (job: Job) => ({
    ["Company"]:
      (getCompany(job.company || job.companyId) || {}).name ||
      `${job.companyId} - (MISSING)`,
    ["Title"]: job.title,
    ["Loc."]: job.location,
    ["Norm. Loc."]:
      job.normalizedLocation && job.normalizedLocation.length > 0
        ? job.normalizedLocation.map((x) => `\`${x}\``).join(", ")
        : "⚠️",
  });
  let body = `## Auto-update ${formattedDate}\n`;
  if (Object.keys(scrapingErrors).length) {
    body += `\n### ⚠️ Scraping errors detected  \n`;
    Object.entries(scrapingErrors).forEach(([companyId, error]) => {
      const company = getCompany(companyId);
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
      const company = getCompany(invalidLocation.companyId);
      body += `- __${company.name}__: \`${invalidLocation.location}\` (${invalidLocation.count}) `;
      body += `  \n`;
    });
  }
  return body;
}


interface CreateNewJobsDataPullRequestParams {
  jobs: Job[];
  addedJobs: Job[];
  removedJobs: Job[];
  scrapingErrors: Record<string, Error>;
  invalidLocations: any[]; // Define more specific type
}

export async function createNewJobsDataPullRequest({
  jobs,
  addedJobs,
  removedJobs,
  scrapingErrors,
  invalidLocations,
}: CreateNewJobsDataPullRequestParams) {

  const date = new Date();
  const formattedDate = toPrettyIsoDate(date);
  const files = { [jobsFilePath]: "", [`${jobsHistoryDir}/jobs-history.${formattedDate}.json`]: "" };
  files[jobsFilePath] = prettier.format(JSON.stringify(jobs), {
    printWidth: 1000,
    parser: "json",
  });

  if (removedJobs.length) {
    const jobsHistoryPath = `${jobsHistoryDir}/jobs-history.${formattedDate}.json`;
    files[jobsHistoryPath] = JSON.stringify(removedJobs);
  }
  const pullRequest = await octokit.createPullRequest({
    owner: GITHUB_OWNER!,
    repo: GITHUB_REPO!,
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

