"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jobs_data_json_1 = __importDefault(require("./jobs-data.json"));
const companies_data_json_1 = __importDefault(require("../companies/companies-data.json"));
const locations_data_json_1 = __importDefault(require("../locations/locations-data.json"));
const departments_data_json_1 = __importDefault(require("../departments/departments-data.json"));
const schema = joi_1.default.array().items(joi_1.default.object({
    companyId: joi_1.default.string().valid(...companies_data_json_1.default.map((company) => company.id)),
    department: joi_1.default.any(),
    url: joi_1.default.string().uri().required(),
    id: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    normalizedLocation: joi_1.default.array()
        .optional()
        .items(joi_1.default.string().valid(...locations_data_json_1.default.map((location) => location.id))),
    normalizedDepartment: joi_1.default.optional().valid(...departments_data_json_1.default.map((department) => department.id)),
    title: joi_1.default.string().required(),
    createdAt: joi_1.default.date().timestamp().required(),
    status: joi_1.default.string().optional().valid("disabled"),
    _id: joi_1.default.any(),
    _updatedAt: joi_1.default.any(),
}));
test("satisfies the schema", () => {
    const validationResult = schema.validate(jobs_data_json_1.default);
    if (validationResult && validationResult.error) {
        console.error(validationResult.error.details);
    }
    expect(validationResult.error).toBeFalsy();
    expect(validationResult.warning).toBeFalsy();
    expect(validationResult.value).toBeTruthy();
});
