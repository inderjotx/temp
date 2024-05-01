"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const greenhouse_strategy_1 = require("./greenhouse-strategy");
const greenhouse_strategy_mock_1 = require("./greenhouse-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromGreenhouse", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(greenhouse_strategy_mock_1.input));
        const result = await (0, greenhouse_strategy_1.getJobsFromGreenhouse)("netlify");
        expect(result).toEqual(greenhouse_strategy_mock_1.output);
    });
});
