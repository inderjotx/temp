require("dotenv").config();

import ora from 'ora'
import chalk from 'chalk'
import { allCompanies, updateCompany } from "../src/companies";
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { Company } from '@tokenjobs/types';

interface CommandLineOptions {
  companyId?: string;
  limit?: number;
  skipExisting?: boolean;
  skipWriting?: boolean;
}



async function fetchCrunchbaseEntity(entityId: string) {
  const responseRaw = await fetch(
    `https://api.crunchbase.com/api/v4/entities/organizations/${entityId}?user_key=${process.env.CRUNCHBASE_API_KEY}&card_ids=fields`
  );
  return responseRaw.json();
}

function parseCrunchbaseEntity(crunchbaseEntity: any) {
  return {
    description: crunchbaseEntity.cards?.fields?.short_description,
    ipo: crunchbaseEntity.cards?.fields?.ipo_status,
    numberOfEmployesEnum: crunchbaseEntity.cards?.fields?.num_employees_enum,
    foundedOn: crunchbaseEntity.cards?.fields?.founded_on?.value?.substr?.(
      0,
      4
    ),
  };
}

const { companyId, limit, skipExisting, skipWriting } = yargs(
  hideBin(process.argv)
)
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
  }).argv as CommandLineOptions;


(async function scrapeCompanyMetadata() {
  let companies = allCompanies;
  if (companyId) {
    companies = [companies.find((company) => company.id === companyId) as Company];
  }
  if (skipExisting) {
    companies = companies.filter(
      (company) => !company.crunchbaseMeta?.description
    );
  }
  if (limit) {
    companies = companies.slice(0, limit);
  }
  const updatedCompaniesData = [...allCompanies];
  for (const company of companies) {
    const spinner = ora(
      `Fetching Crunchbase meta of "${company.id}"...`
    ).start();
    let crunchbaseMeta = {};
    try {
      if (!company.crunchbaseConfig?.id) {
        throw new Error("Missing crunchbaseConfig.id");
      }
      const crunchbaseEntity = await fetchCrunchbaseEntity(
        company.crunchbaseConfig.id
      );
      if (crunchbaseEntity.error) {
        throw new Error(crunchbaseEntity.error);
      }
      const crunchbaseMeta = parseCrunchbaseEntity(crunchbaseEntity);
      spinner.succeed(`Crunchbase metadata of "${company.id}" fetched.`);
      console.log(`  ${chalk.dim(crunchbaseMeta.description)}`);


      const doesExist = updatedCompaniesData.find((x) => x.id === company.id);

      if (doesExist) {
        doesExist.crunchbaseMeta = crunchbaseMeta
      }


      if (!skipWriting) {
        updateCompany(company.id, {
          crunchbaseMeta: crunchbaseMeta,
        });
      }


    } catch (err) {
      spinner.fail(`Couldn't fetch Crunchbase metadata of "${company.id}".`);

      if (err instanceof Error) {
        console.log(chalk.red(`  Error: ${err.message}`));
      }
      else {
        console.log(chalk.red(`  Error: ${err}`));
      }
    }

  }
})();
