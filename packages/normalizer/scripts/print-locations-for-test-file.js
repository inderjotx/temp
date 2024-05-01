"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_api_1 = require("@remotebear/data-api");
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const { companyId } = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).option("company-id", {
    type: "string",
    description: "Company ID",
    demandOption: true,
}).argv;
function uniqueByLocation(arr) {
    return arr.filter((item, index, self) => {
        return index === self.findIndex((t) => t.location === item.location);
    });
}
(function printLocationsForTestFile() {
    console.log(JSON.stringify(uniqueByLocation((0, data_api_1.getTempCompanyJobs)(companyId))
        .map((x) => [x.companyId, x.normalizedLocation, x.location])
        .sort((a, b) => (a[1].toString() > b[1].toString() ? 1 : -1))));
})();
