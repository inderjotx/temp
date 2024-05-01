"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLocations = exports.allLocationsById = exports.locationIds = void 0;
const locations_data_json_1 = __importDefault(require("@remotebear/data/locations/locations-data.json"));
exports.locationIds = locations_data_json_1.default.reduce((acc, location) => {
    acc[location.id] = location.id;
    return acc;
}, {});
exports.allLocationsById = locations_data_json_1.default.reduce((acc, location) => {
    acc[location.id] = location;
    return acc;
}, {});
exports.allLocations = locations_data_json_1.default;
