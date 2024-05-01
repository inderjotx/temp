"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workable_strategy_1 = require("./workable-strategy");
const workable_strategy_mock_1 = require("./workable-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromWorkable", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(workable_strategy_mock_1.input));
        const result = await (0, workable_strategy_1.getJobsFromWorkable)("doist");
        expect(result).toEqual(workable_strategy_mock_1.output);
    });
});
