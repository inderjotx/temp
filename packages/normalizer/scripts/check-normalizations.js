"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
const helpers_1 = require("yargs/helpers");
const yargs_1 = __importDefault(require("yargs/yargs"));
const { onlyMissing, companyId } = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("company-id", {
    type: "string",
    description: "Run only for a specific company",
})
    .option("only-missing", {
    type: "boolean",
    description: "Show only invalid normalizations",
}).argv;
(function checkNormalizations({ type }) {
    if (!type) {
        type = "location";
    }
    const { globalResults, resultsByCompanyId } = (0, normalizer_1.validateNormalization)({
        jobs: companyId
            ? data_api_1.allJobs.filter((x) => x.companyId === companyId)
            : data_api_1.allJobs,
        allCompanies: data_api_1.allCompanies.filter((x) => x.status !== "disabled"),
        // @ts-ignore
        getNormalizedValue: type === "location" ? normalizer_1.getNormalizedLocation : normalizer_1.getNormalizedDepartment,
        fieldName: type,
    });
    Object.entries(resultsByCompanyId)
        .filter(([, companyResult]) => onlyMissing
        ? companyResult.jobsCount > 0 &&
            companyResult.successfulJobNormalizationsCount <
                companyResult.jobsCount
        : true)
        .forEach(([companyId, companyResult]) => {
        const company = data_api_1.allCompanies.find((company) => companyId === company.id);
        console.log(chalk_1.default.bold.magenta(`» ${company?.name}`));
        companyResult.normalizations
            .filter((normalization) => onlyMissing ? !normalization.successful : true)
            .forEach((normalization) => {
            const symbol = normalization.successful
                ? chalk_1.default.green("✓")
                : chalk_1.default.red("x");
            const prettyOutput = (Array.isArray(normalization.output)
                ? normalization.output.join(", ")
                : normalization.output) || "not found";
            console.log(`- ${symbol} ${chalk_1.default.bold(normalization.input)} → ${prettyOutput} (${normalization.jobsCount} jobs)`);
        });
        const successPercentage = parseFloat(((companyResult.successfulJobNormalizationsCount /
            companyResult.jobsCount) *
            100 || 0).toFixed(2));
        console.log(`${successPercentage}% of ${company?.name} job locations have been normalized successfully.\n`);
    });
    const globalSuccessPercentage = parseFloat(((globalResults.successfulJobNormalizationsCount / globalResults.jobsCount) *
        100).toFixed(2));
    console.log(chalk_1.default.bold(`${globalSuccessPercentage}% of all job location have been matched successfully (${globalResults.successfulJobNormalizationsCount} out of ${globalResults.jobsCount}).\n`));
})({ type: "location" });
