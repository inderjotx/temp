import { loadAllConfigs } from "@tokenjobs/scraper";
import { getNormalizedLocation } from "./location-normalizer";
import mock from "./location-normalizer.mock.json";

const testTable = mock.map(([companyId, output, location]) => [
  [location, companyId],
  output,
]);

describe('Location Normalization Tests', () => {
  let companyConfigs: Record<string, any>;

  // Load configurations before all tests
  beforeAll(async () => {
    companyConfigs = await loadAllConfigs();
  });

  test.each(testTable)("normalizes %p into %p", (input, output) => {
    const job = Array.isArray(input)
      ? { location: input[0] as string, companyId: input[1] as string }
      : { location: input as string | string[] };


    // @ts-ignore
    const normalizedLocation = getNormalizedLocation(job, companyConfigs);

    console.log("input :", job.location)
    console.log("answer :", normalizedLocation)


    let isCorrect = true;

    if (Array.isArray(output)) {

      output.forEach((x) => {
        const response = normalizedLocation.includes(x as string)

        if (isCorrect) {
          isCorrect = response
        }

      });
    }


    expect(isCorrect).toBe(true);

  });
});

