import { getJobsFromWorkable } from "./workable-strategy";
import { input, output } from "./workable-strategy.mock";
import fetchMock from 'jest-fetch-mock'

describe("getJobsFromWorkable", () => {
  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(input));
    const result = await getJobsFromWorkable("doist");
    expect(result).toEqual(output);
  });
});
