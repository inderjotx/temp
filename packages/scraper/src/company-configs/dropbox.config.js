"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = void 0;
const data_api_1 = require("@remotebear/data-api");
const dropboxLocationToNormalizedLocation = {
    us: [data_api_1.locationIds.us],
    emea: [data_api_1.locationIds.eu, data_api_1.locationIds.other],
    apac: [data_api_1.locationIds.australia, data_api_1.locationIds.other],
    israel: [data_api_1.locationIds.other],
    apj: [data_api_1.locationIds.other],
};
// Dropbox writes its remote locations this way:
// - Tokyo, Japan; Remote - APAC
// - Austin, TX; Remote - US
// - etc...
function getNormalizedLocation({ location }) {
    let normalizedLocation = [];
    Object.entries(dropboxLocationToNormalizedLocation).forEach(([locationOption, locationOptionNormalizedLocation]) => {
        if (location.toLowerCase().includes(`remote - ${locationOption}`)) {
            normalizedLocation = [
                ...normalizedLocation,
                ...locationOptionNormalizedLocation,
            ];
        }
    });
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
