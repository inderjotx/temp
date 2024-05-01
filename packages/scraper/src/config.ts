require("dotenv").config();

const config = {
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  GITHUB_OWNER: process.env.GITHUB_OWNER,
  GITHUB_REPO: process.env.GITHUB_REPO,
};

export const GITHUB_API_TOKEN = config.GITHUB_API_TOKEN;
export const GITHUB_OWNER = config.GITHUB_OWNER;
export const GITHUB_REPO = config.GITHUB_REPO;