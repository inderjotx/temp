"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Joi = require("joi");
const joi_1 = __importDefault(require("joi"));
// const companiesData = require("./companies-data.json");
const companies_data_json_1 = __importDefault(require("./companies-data.json"));
const schema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    url: joi_1.default.string().uri().required(),
    status: joi_1.default.string().valid("enabled", "disabled"),
    scrapingStrategy: joi_1.default.valid("greenhouse", "lever", "workable", "workday", "recruitee", "personio", "smartrecruiters", "custom"),
    scrapingConfig: joi_1.default.object({
        id: joi_1.default.string().required(),
        version: joi_1.default.number(),
        url: joi_1.default.string().uri(),
    }),
    crunchbaseConfig: joi_1.default.object({
        id: joi_1.default.string().required(),
    }),
    crunchbaseMeta: joi_1.default.object({
        description: joi_1.default.string(),
        ipo: joi_1.default.string(),
        numberOfEmployesEnum: joi_1.default.string(),
        foundedOn: joi_1.default.string(),
    }),
    createdAt: joi_1.default.number(),
}));
test("satisfies the schema", () => {
    const validationResult = schema.validate(companies_data_json_1.default);
    if (validationResult && validationResult.error) {
        console.error(validationResult.error.details);
    }
    expect(validationResult.error).toBeFalsy();
    expect(validationResult.warning).toBeFalsy();
    expect(validationResult.value).toBeTruthy();
});
