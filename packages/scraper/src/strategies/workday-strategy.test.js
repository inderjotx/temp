"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workday_strategy_1 = require("./workday-strategy");
const workday_strategy_mock_1 = require("./workday-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromWorkday", () => {
    test.skip("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponses(...workday_strategy_mock_1.input);
        const result = await (0, workday_strategy_1.getJobsFromWorkday)("https://zoom.wd5.myworkdayjobs.com/Zoom");
        expect(result).toEqual(workday_strategy_mock_1.output);
    });
});
