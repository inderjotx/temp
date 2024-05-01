import { createCompany } from "../src/companies";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

// Define an interface for the command line arguments
interface CommandLineOptions {
  id: string;
  name: string;
  url: string;
  scrapingStrategy: string;
  scrapingId?: string;
  crunchbaseId?: string;
}

// Parse the command line arguments
const { id, name, url, scrapingStrategy, scrapingId, crunchbaseId } = yargs(
  hideBin(process.argv)
)
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
  .argv as CommandLineOptions;

createCompany({
  id,
  name,
  url,
  scrapingStrategy,
  ...(scrapingId && { id: scrapingId }),
  ...(crunchbaseId && { id: crunchbaseId })
})