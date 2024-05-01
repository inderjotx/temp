import { getJobsFromSmartrecruiters } from "./smartrecruiters-strategy";
import { input, output } from "./smartrecruiters-strategy.mock";
import fetchMock from 'jest-fetch-mock'

describe("getJobsFromSmartrecruiters", () => {
  test("succeeds", async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(input[0]))
      .mockResponseOnce(JSON.stringify(input[1]));
    const result = await getJobsFromSmartrecruiters("shopify", { limit: 50 });
    expect(result).toEqual(output);
  });
});
