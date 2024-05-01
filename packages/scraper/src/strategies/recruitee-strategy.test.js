"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recruitee_strategy_1 = require("./recruitee-strategy");
const recruitee_strategy_mock_1 = require("./recruitee-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromRecruitee", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(recruitee_strategy_mock_1.input));
        const result = await (0, recruitee_strategy_1.getJobsFromRecruitee)("hotjar");
        expect(result).toEqual(recruitee_strategy_mock_1.output);
    });
});
