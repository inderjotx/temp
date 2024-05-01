"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const duckduckgo_config_1 = require("./duckduckgo.config");
const duckduckgo_config_mock_1 = require("./duckduckgo.config.mock");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
describe("scrapeJobs", () => {
    beforeEach(() => {
        jest_fetch_mock_1.default.resetMocks();
    });
    test("succeeds", async () => {
        jest_fetch_mock_1.default.mockResponseOnce(JSON.stringify(duckduckgo_config_mock_1.mockResponse));
        const result = await (0, duckduckgo_config_1.scrapeJobs)();
        expect(result).toEqual(duckduckgo_config_mock_1.mockResult);
    });
});
