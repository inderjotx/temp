"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const smartrecruiters_strategy_1 = require("./smartrecruiters-strategy");
const smartrecruiters_strategy_mock_1 = require("./smartrecruiters-strategy.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobsFromSmartrecruiters", () => {
    test("succeeds", async () => {
        jest_fetch_mock_1.default
            .mockResponseOnce(JSON.stringify(smartrecruiters_strategy_mock_1.input[0]))
            .mockResponseOnce(JSON.stringify(smartrecruiters_strategy_mock_1.input[1]));
        const result = await (0, smartrecruiters_strategy_1.getJobsFromSmartrecruiters)("shopify", { limit: 50 });
        expect(result).toEqual(smartrecruiters_strategy_mock_1.output);
    });
});
