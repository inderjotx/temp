"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationLooselyEndsWith = exports.locationLooselyStartsWith = exports.locationLooselyIncludes = exports.locationKeywordsLooselyMatch = exports.locationLooselyMatches = exports.keywordifyLocation = exports.sanitizeLocation = exports.uniq = void 0;
function uniq(arr) {
    return [...new Set(arr)];
}
exports.uniq = uniq;
function sanitizeLocation(location) {
    return location
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, "")
        .replace(/  +/g, " ")
        .trim();
}
exports.sanitizeLocation = sanitizeLocation;
function keywordifyLocation(location) {
    const removableKeywords = [
        "or",
        "in",
        "the",
        "east",
        "eastern",
        "west",
        "western",
        "hq",
        "hemisphere",
        "north",
        "only",
        "within",
        "central",
        "coast",
    ];
    return uniq(sanitizeLocation(location).split(" "))
        .filter((keyword) => !removableKeywords.includes(keyword))
        .sort();
}
exports.keywordifyLocation = keywordifyLocation;
function locationLooselyMatches(location, cases) {
    cases = typeof cases === "string" ? [cases] : cases;
    return cases.map(sanitizeLocation).includes(sanitizeLocation(location));
}
exports.locationLooselyMatches = locationLooselyMatches;
function locationKeywordsLooselyMatch(location, cases) {
    cases = typeof cases === "string" ? [cases] : cases;
    const locationKeywords = keywordifyLocation(location);
    return cases.some((x) => keywordifyLocation(x).toString() === locationKeywords.toString());
}
exports.locationKeywordsLooselyMatch = locationKeywordsLooselyMatch;
function locationLooselyIncludes(location, cases) {
    cases = typeof cases === "string" ? [cases] : cases;
    return cases.some((x) => sanitizeLocation(location).includes(sanitizeLocation(x)));
}
exports.locationLooselyIncludes = locationLooselyIncludes;
function locationLooselyStartsWith(location, cases) {
    cases = typeof cases === "string" ? [cases] : cases;
    return cases.some((x) => sanitizeLocation(location).startsWith(sanitizeLocation(x)));
}
exports.locationLooselyStartsWith = locationLooselyStartsWith;
function locationLooselyEndsWith(location, cases) {
    cases = typeof cases === "string" ? [cases] : cases;
    return cases.some((x) => sanitizeLocation(location).endsWith(sanitizeLocation(x)));
}
exports.locationLooselyEndsWith = locationLooselyEndsWith;
