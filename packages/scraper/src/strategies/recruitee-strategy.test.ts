import { getJobsFromRecruitee } from "./recruitee-strategy"
import { input, output } from "./recruitee-strategy.mock";
import fetchMock from "jest-fetch-mock";

describe("getJobsFromRecruitee", () => {
  test("succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(input));
    const result = await getJobsFromRecruitee("hotjar");
    expect(result).toEqual(output);
  });
});
