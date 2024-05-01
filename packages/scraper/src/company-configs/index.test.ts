import { loadAllConfigs } from "./index";

const allowedConfigFields = [
  "scrapeJobs",
  "applyPostScrapingCustomizations",
  "getNormalizedLocation",
  "defaultGlobalLocation",
  "extractLocationFromJobDescription", // Just for testing purposes (see toggl.config)
];


describe('Configuration Fields Validation', () => {
  let companyConfigs: Record<string, any>;

  beforeAll(async () => {
    companyConfigs = await loadAllConfigs();
  });

  test('all configurations should only contain valid fields', () => {

    Object.entries(companyConfigs).forEach(([companyId, companyConfig]) => {
      const configFields = Object.keys(companyConfig);
      const invalidConfigFields = configFields.filter(
        (configField) => !allowedConfigFields.includes(configField)
      );

      if (invalidConfigFields.length > 0) {
        console.log(companyId, companyConfig);
      }
      expect(invalidConfigFields.length).toBe(0);
    });
  });
});
