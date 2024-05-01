import { scrapeJobs } from "./twitter.config";

import { input, output } from "./twitter.config.mock";
import fetchMock from "jest-fetch-mock";

describe("getJobs", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("succeeds", async () => {
    fetchMock.mockResponse(JSON.stringify(input));
    const result = await scrapeJobs();
    expect(result).toEqual(output);
  });
});
