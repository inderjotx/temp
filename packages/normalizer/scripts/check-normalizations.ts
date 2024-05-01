import chalk from "chalk";
import { allJobs, allCompanies } from "@remotebear/data-api"
import { validateNormalization, getNormalizedLocation, getNormalizedDepartment } from "@remotebear/normalizer";
import { hideBin } from "yargs/helpers";

import yargs from "yargs/yargs";


interface CompanyResults {
  [companyId: string]: {
    jobsCount: number;
    successfulJobNormalizationsCount: number;
    normalizations: Array<{
      successful: boolean;
      input: string;
      output: string[] | string;
      jobsCount: number;
    }>;
  };
}

interface GlobalResults {
  successfulJobNormalizationsCount: number;
  jobsCount: number;
}

interface CheckNormalizationOptions {
  type?: "location" | "department";
}



const { onlyMissing, companyId } = yargs(hideBin(process.argv))
  .option("company-id", {
    type: "string",
    description: "Run only for a specific company",
  })
  .option("only-missing", {
    type: "boolean",
    description: "Show only invalid normalizations",
  }).argv as { onlyMissing: boolean; companyId: string };


(function checkNormalizations({ type }: { type: "location" | "department" | undefined }) {

  if (!type) {
    type = "location";
  }

  const { globalResults, resultsByCompanyId }: { globalResults: GlobalResults, resultsByCompanyId: CompanyResults } = validateNormalization({
    jobs: companyId
      ? allJobs.filter((x) => x.companyId === companyId)
      : allJobs,
    allCompanies: allCompanies.filter((x) => x.status !== "disabled"),
    // @ts-ignore
    getNormalizedValue:
      type === "location" ? getNormalizedLocation : getNormalizedDepartment,
    fieldName: type,
  });

  Object.entries(resultsByCompanyId)
    .filter(([, companyResult]) =>
      onlyMissing
        ? companyResult.jobsCount > 0 &&
        companyResult.successfulJobNormalizationsCount <
        companyResult.jobsCount
        : true
    )
    .forEach(([companyId, companyResult]) => {
      const company = allCompanies.find((company) => companyId === company.id);
      console.log(chalk.bold.magenta(`» ${company?.name}`));
      companyResult.normalizations
        .filter((normalization) =>
          onlyMissing ? !normalization.successful : true
        )
        .forEach((normalization) => {
          const symbol = normalization.successful
            ? chalk.green("✓")
            : chalk.red("x");
          const prettyOutput =
            (Array.isArray(normalization.output)
              ? normalization.output.join(", ")
              : normalization.output) || "not found";
          console.log(
            `- ${symbol} ${chalk.bold(
              normalization.input
            )} → ${prettyOutput} (${normalization.jobsCount} jobs)`
          );
        });
      const successPercentage = parseFloat(
        ((companyResult.successfulJobNormalizationsCount /
          companyResult.jobsCount) *
          100 || 0
        ).toFixed(2));
      console.log(
        `${successPercentage}% of ${company?.name} job locations have been normalized successfully.\n`
      );
    });

  const globalSuccessPercentage = parseFloat(
    ((globalResults.successfulJobNormalizationsCount / globalResults.jobsCount) *
      100
    ).toFixed(2));
  console.log(
    chalk.bold(
      `${globalSuccessPercentage}% of all job location have been matched successfully (${globalResults.successfulJobNormalizationsCount} out of ${globalResults.jobsCount}).\n`
    )
  );
})({ type: "location" });
