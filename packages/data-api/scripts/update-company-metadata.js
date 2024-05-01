"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const companies_1 = require("../src/companies");
const helpers_1 = require("yargs/helpers");
const yargs_1 = __importDefault(require("yargs/yargs"));
async function fetchCrunchbaseEntity(entityId) {
    const responseRaw = await fetch(`https://api.crunchbase.com/api/v4/entities/organizations/${entityId}?user_key=${process.env.CRUNCHBASE_API_KEY}&card_ids=fields`);
    return responseRaw.json();
}
function parseCrunchbaseEntity(crunchbaseEntity) {
    return {
        description: crunchbaseEntity.cards?.fields?.short_description,
        ipo: crunchbaseEntity.cards?.fields?.ipo_status,
        numberOfEmployesEnum: crunchbaseEntity.cards?.fields?.num_employees_enum,
        foundedOn: crunchbaseEntity.cards?.fields?.founded_on?.value?.substr?.(0, 4),
    };
}
const { companyId, limit, skipExisting, skipWriting } = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("company-id", {
    type: "string",
    description: "Run only for a specific company",
})
    .option("limit", {
    type: "number",
    description: "Run only on the first n companies",
})
    .option("skip-existing", {
    type: "boolean",
    description: "Skip companies with existing metadata?",
})
    .option("skip-writing", {
    type: "boolean",
    description: "Skip writing the output to companies-data.json?",
}).argv;
(async function scrapeCompanyMetadata() {
    let companies = companies_1.allCompanies;
    if (companyId) {
        companies = [companies.find((company) => company.id === companyId)];
    }
    if (skipExisting) {
        companies = companies.filter((company) => !company.crunchbaseMeta?.description);
    }
    if (limit) {
        companies = companies.slice(0, limit);
    }
    const updatedCompaniesData = [...companies_1.allCompanies];
    for (const company of companies) {
        const spinner = (0, ora_1.default)(`Fetching Crunchbase meta of "${company.id}"...`).start();
        let crunchbaseMeta = {};
        try {
            if (!company.crunchbaseConfig?.id) {
                throw new Error("Missing crunchbaseConfig.id");
            }
            const crunchbaseEntity = await fetchCrunchbaseEntity(company.crunchbaseConfig.id);
            if (crunchbaseEntity.error) {
                throw new Error(crunchbaseEntity.error);
            }
            const crunchbaseMeta = parseCrunchbaseEntity(crunchbaseEntity);
            spinner.succeed(`Crunchbase metadata of "${company.id}" fetched.`);
            console.log(`  ${chalk_1.default.dim(crunchbaseMeta.description)}`);
            const doesExist = updatedCompaniesData.find((x) => x.id === company.id);
            if (doesExist) {
                doesExist.crunchbaseMeta = crunchbaseMeta;
            }
            if (!skipWriting) {
                (0, companies_1.updateCompany)(company.id, {
                    crunchbaseMeta: crunchbaseMeta,
                });
            }
        }
        catch (err) {
            spinner.fail(`Couldn't fetch Crunchbase metadata of "${company.id}".`);
            if (err instanceof Error) {
                console.log(chalk_1.default.red(`  Error: ${err.message}`));
            }
            else {
                console.log(chalk_1.default.red(`  Error: ${err}`));
            }
        }
    }
})();
