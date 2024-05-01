"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.createCompany = exports.validateCompany = exports.getCompany = exports.allCompaniesById = exports.allCompanies = void 0;
const companies_data_json_1 = __importDefault(require("@remotebear/data/companies/companies-data.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const companiesDataPath = "../../data/companies/companies-data.json";
// THIS COULD BE PROBLEMATIC
// @ts-ignore
exports.allCompanies = companies_data_json_1.default;
exports.allCompaniesById = companies_data_json_1.default.reduce((acc, company) => {
    // @ts-ignore
    acc[company.id] = company;
    return acc;
}, {});
function getCompany(companyId) {
    return exports.allCompaniesById[companyId];
}
exports.getCompany = getCompany;
function validateCompany(company) {
    if (!company) {
        throw new Error(`Invalid (nullish) company.`);
    }
    const requiredFields = ["id", "name", "url"];
    const missingRequiredField = requiredFields.some((requiredField) => !Object.keys(company).includes(requiredField));
    if (missingRequiredField) {
        throw new Error(`The company is missing the "${missingRequiredField}" field.`);
    }
}
exports.validateCompany = validateCompany;
async function createCompany(company) {
    validateCompany(company);
    if (companies_data_json_1.default.find((x) => x.id === company.id)) {
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
    const updatedCompaniesData = [...companies_data_json_1.default, newCompany];
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, companiesDataPath), JSON.stringify(updatedCompaniesData));
    // @ts-ignore
    companies_data_json_1.default = updatedCompaniesData;
    return newCompany;
}
exports.createCompany = createCompany;
async function updateCompany(companyId, company) {
    const existingCompany = companies_data_json_1.default.find((x) => x.id === companyId);
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
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, companiesDataPath), JSON.stringify(companies_data_json_1.default));
    return existingCompany;
}
exports.updateCompany = updateCompany;
