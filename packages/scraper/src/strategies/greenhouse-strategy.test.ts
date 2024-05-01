import { getJobsFromGreenhouse } from "./greenhouse-strategy"
import { input, output } from "./greenhouse-strategy.mock"
import fetchMock from "jest-fetch-mock"

describe("getJobsFromGreenhouse", () => {
  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(input));
    const result = await getJobsFromGreenhouse("netlify");
    expect(result).toEqual(output);
  });
});
