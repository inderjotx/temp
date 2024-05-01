import { getJobsFromWorkday } from "./workday-strategy";
import { input, output } from "./workday-strategy.mock";
import fetchMock from "jest-fetch-mock";

describe("getJobsFromWorkday", () => {
  test.skip("succeeds", async () => {
    fetchMock.mockResponses(...input as any);
    const result = await getJobsFromWorkday(
      "https://zoom.wd5.myworkdayjobs.com/Zoom"
    );
    expect(result).toEqual(output);
  });
});
