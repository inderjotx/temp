import { scrapeJobs } from "./discord.config";
import { mockResult, mockResponse } from "./discord.config.mock";
import fetchMock from 'jest-fetch-mock';

describe("scrapeJobs", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await scrapeJobs();
    expect(result).toEqual(mockResult);
  });
});
