import companiesData from "@remotebear/data/companies/companies-data.json";
import fs from "fs";
import path from "path";
import { Company } from "@remotebear/types";

const companiesDataPath = "../../data/companies/companies-data.json";

// THIS COULD BE PROBLEMATIC
// @ts-ignore
export let allCompanies: Company[] = companiesData;

export const allCompaniesById = companiesData.reduce((acc, company) => {
  // @ts-ignore
  acc[company.id] = company;
  return acc;
}, {} as Record<string, Company>);

export function getCompany(companyId: string) {
  return allCompaniesById[companyId];
}

export function validateCompany(company: Partial<Company>) {
  if (!company) {
    throw new Error(`Invalid (nullish) company.`);
  }
  const requiredFields = ["id", "name", "url"];
  const missingRequiredField = requiredFields.some(
    (requiredField) => !Object.keys(company).includes(requiredField)
  );
  if (missingRequiredField) {
    throw new Error(
      `The company is missing the "${missingRequiredField}" field.`
    );
  }
}

export async function createCompany(company: Company) {
  validateCompany(company);
  if (companiesData.find((x) => x.id === company.id)) {
    throw new Error(`A company with id "${company.id}" already exists.`);
  }
  const newCompany = {
    id: company.id,
    name: company.name,
    url: company.url,
    crunchbaseConfig: company.crunchbaseConfig || { id: company.id },
    crunchbaseMeta: company.crunchbaseMeta || {},
    scrapingConfig: company.scrapingConfig || { id: company.id },
    scrapingStrategy: company.scrapingStrategy || "custom",
    status: company.status || "enabled",
    createdAt: company.createdAt || Date.now(),
  };
  const updatedCompaniesData = [...companiesData, newCompany];
  fs.writeFileSync(
    path.resolve(__dirname, companiesDataPath),
    JSON.stringify(updatedCompaniesData)
  );
  // @ts-ignore
  companiesData = updatedCompaniesData as Company[];
  return newCompany;
}

export async function updateCompany(companyId: string, company: Partial<Company>) {
  const existingCompany = companiesData.find((x) => x.id === companyId);
  if (!existingCompany) {
    throw new Error(`A company with id "${companyId}" does not exist.`);
  }
  existingCompany.name = company.name || existingCompany.name;
  existingCompany.url = company.url || existingCompany.url;
  existingCompany.crunchbaseConfig =
    company.crunchbaseConfig || existingCompany.crunchbaseConfig;

  //@ts-ignore
  existingCompany.scrapingConfig =
    company.scrapingConfig || existingCompany.scrapingConfig;
  existingCompany.scrapingStrategy =
    company.scrapingStrategy || existingCompany.scrapingStrategy;
  existingCompany.status = company.status || existingCompany.status;
  existingCompany.createdAt = company.createdAt || existingCompany.createdAt;
  fs.writeFileSync(
    path.resolve(__dirname, companiesDataPath),
    JSON.stringify(companiesData)
  );
  return existingCompany;
}

