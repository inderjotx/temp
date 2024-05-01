"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lever_strategy_1 = require("./lever-strategy");
const lever_strategy_mock_1 = require("./lever-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromLever", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(lever_strategy_mock_1.input));
        const result = await (0, lever_strategy_1.getJobsFromLever)("1password");
        expect(result).toEqual(lever_strategy_mock_1.output);
    });
});
