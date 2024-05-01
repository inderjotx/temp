"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const personio_strategy_1 = require("./personio-strategy");
const personio_strategy_mock_1 = require("./personio-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromPersonio", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(personio_strategy_mock_1.input));
        const result = await (0, personio_strategy_1.getJobsFromPersonio)(2, "stylight");
        expect(result).toEqual(personio_strategy_mock_1.output);
    });
});
