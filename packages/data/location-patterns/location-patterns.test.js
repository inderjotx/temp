"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const locations_data_json_1 = __importDefault(require("../locations/locations-data.json"));
const location_patterns_data_json_1 = __importDefault(require("./location-patterns-data.json"));
const schema = joi_1.default.array().items(joi_1.default.object({
    locationIds: joi_1.default.array().items(joi_1.default.string().valid(...locations_data_json_1.default.map((location) => location.id))),
    type: joi_1.default.string().valid("match", "keywords", "starts-with", "ends-with"),
    pattern: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.string()), joi_1.default.string()),
}));
test("satisfies the schema", () => {
    const validationResult = schema.validate(location_patterns_data_json_1.default);
    if (validationResult && validationResult.error) {
        console.error(validationResult.error.details);
    }
    expect(validationResult.error).toBeFalsy();
    expect(validationResult.warning).toBeFalsy();
    expect(validationResult.value).toBeTruthy();
});
