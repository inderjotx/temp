import { getJobsFromPersonio } from "./personio-strategy"
import { input, output } from "./personio-strategy.mock";
import fetchMock from "jest-fetch-mock";

describe("getJobsFromPersonio", () => {
  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(input));
    const result = await getJobsFromPersonio(2, "stylight");
    expect(result).toEqual(output);
  });
});
