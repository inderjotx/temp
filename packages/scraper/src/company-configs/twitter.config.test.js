"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_config_1 = require("./twitter.config");
const twitter_config_mock_1 = require("./twitter.config.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("getJobs", () => {
    beforeEach(() => {
        jest_fetch_mock_1.default.resetMocks();
    });
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponse(JSON.stringify(twitter_config_mock_1.input));
        const result = await (0, twitter_config_1.scrapeJobs)();
        expect(result).toEqual(twitter_config_mock_1.output);
    });
});
