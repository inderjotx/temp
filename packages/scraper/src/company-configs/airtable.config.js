"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
// Airtable is US only
function getNormalizedLocation() {
    const normalizedLocation = [];
    normalizedLocation.push(data_api_1.locationIds.us);
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
