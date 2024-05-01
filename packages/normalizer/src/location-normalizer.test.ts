import { loadAllConfigs } from "@remotebear/scraper";
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
    // @ts-ignore
    expect(normalizedLocation).toEqual(output.sort());

  });
});

