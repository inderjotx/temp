"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("@remotebear/scraper");
const location_normalizer_1 = require("./location-normalizer");
const location_normalizer_mock_json_1 = __importDefault(require("./location-normalizer.mock.json"));
const testTable = location_normalizer_mock_json_1.default.map(([companyId, output, location]) => [
    [location, companyId],
    output,
]);
describe('Location Normalization Tests', () => {
    let companyConfigs;
    // Load configurations before all tests
    beforeAll(async () => {
        companyConfigs = await (0, scraper_1.loadAllConfigs)();
    });
    test.each(testTable)("normalizes %p into %p", (input, output) => {
        const job = Array.isArray(input)
            ? { location: input[0], companyId: input[1] }
            : { location: input };
        // @ts-ignore
        const normalizedLocation = (0, location_normalizer_1.getNormalizedLocation)(job, companyConfigs);
        // @ts-ignore
        expect(normalizedLocation).toEqual(output.sort());
    });
});
