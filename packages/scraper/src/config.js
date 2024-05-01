"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_REPO = exports.GITHUB_OWNER = exports.GITHUB_API_TOKEN = void 0;
require("dotenv").config();
const config = {
    GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    GITHUB_REPO: process.env.GITHUB_REPO,
};
exports.GITHUB_API_TOKEN = config.GITHUB_API_TOKEN;
exports.GITHUB_OWNER = config.GITHUB_OWNER;
exports.GITHUB_REPO = config.GITHUB_REPO;
