"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companies_1 = require("../src/companies");
const helpers_1 = require("yargs/helpers");
const yargs_1 = __importDefault(require("yargs/yargs"));
// Parse the command line arguments
const { id, name, url, scrapingStrategy, scrapingId, crunchbaseId } = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("id", {
    type: "string",
    description: "Company ID",
    demandOption: true,
})
    .option("name", {
    type: "string",
    description: "Company name",
    demandOption: true,
})
    .option("url", {
    type: "string",
    description: "Company website URL",
    demandOption: true,
})
    .option("scraping-strategy", {
    type: "string",
    description: "Scraping strategy",
    demandOption: true,
})
    .option("scraping-id", {
    type: "string",
    description: "Scraping ID (defaults to company ID)",
})
    .option("crunchbase-id", {
    type: "string",
    description: "Crunchbase ID (defaults to company ID)",
})
    .argv;
(0, companies_1.createCompany)({
    id,
    name,
    url,
    scrapingStrategy,
    ...(scrapingId && { id: scrapingId }),
    ...(crunchbaseId && { id: crunchbaseId })
});
