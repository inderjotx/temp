"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe("locationLooselyIncludes", () => {
    test('returns true for "Remote-EU, Remote-Rest of World", "remote rest of world"', () => {
        expect((0, utils_1.locationLooselyIncludes)("Remote EU, Remote Rest of World", "remote rest of world")).toBe(true);
    });
});
describe("locationKeywordsLooselyMatch", () => {
    const testTable = [
        ["Remote UK", ["UK", "Remote US"], false],
        ["Remote UK", ["UK", "Remote US", "Remote - UK"], true],
        ["Remote UK", ["UK", "Remote US", "UK (Remote)"], true],
        ["Remote UK", ["remote UK remote US"], false],
        ["Remote UK", ["remote UK remote"], true],
        ["UK", ["remote UK", "Remote US", "UK (Remote)"], false],
    ];
    test.each(testTable)("%p keywords should match %p? %p", (str, cases, expectation) => {
        expect((0, utils_1.locationKeywordsLooselyMatch)(str, cases)).toEqual(expectation);
    });
});
