import { getTempCompanyJobs } from "@tokenjobs/data-api";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const { companyId } = yargs(hideBin(process.argv)).option("company-id", {
  type: "string",
  description: "Company ID",
  demandOption: true,
}).argv as { companyId: string };

function uniqueByLocation(arr: any[]) {
  return arr.filter((item, index, self) => {
    return index === self.findIndex((t) => t.location === item.location);
  });
}

(function printLocationsForTestFile() {
  console.log(
    JSON.stringify(
      uniqueByLocation(getTempCompanyJobs(companyId))
        .map((x) => [x.companyId, x.normalizedLocation, x.location])
        .sort((a, b) => (a[1].toString() > b[1].toString() ? 1 : -1))
    )
  );
})();
