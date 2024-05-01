"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
// E.g.:
// - Fully remote (UTC-8 to UTC+5.5)
// - Anywhere
// - Remote
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if (location === "Fully remote (UTC-8 to UTC+5.5)") {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
