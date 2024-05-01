"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const departments_data_json_1 = __importDefault(require("./departments-data.json"));
const schema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.string().required(),
    label: joi_1.default.string().required(),
}));
test("satisfies the schema", () => {
    const validationResult = schema.validate(departments_data_json_1.default);
    if (validationResult && validationResult.error) {
        console.error(validationResult.error.details);
    }
    expect(validationResult.error).toBeFalsy();
    expect(validationResult.warning).toBeFalsy();
    expect(validationResult.value).toBeTruthy();
});
