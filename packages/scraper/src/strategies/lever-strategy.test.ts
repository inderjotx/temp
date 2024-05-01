import { getJobsFromLever } from "./lever-strategy";
import { input, output } from "./lever-strategy.mock";
import fetchMock from "jest-fetch-mock";

describe("getJobsFromLever", () => {
  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(input));
    const result = await getJobsFromLever("1password");
    expect(result).toEqual(output);
  });
});
