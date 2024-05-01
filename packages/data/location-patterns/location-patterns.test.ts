
import Joi from 'joi'
import locationsData from "../locations/locations-data.json";
import locationPatterns from "./location-patterns-data.json";

const schema = Joi.array().items(
  Joi.object({
    locationIds: Joi.array().items(
      Joi.string().valid(...locationsData.map((location) => location.id))
    ),
    type: Joi.string().valid("match", "keywords", "starts-with", "ends-with"),
    pattern: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ),
  })
);

test("satisfies the schema", () => {
  const validationResult = schema.validate(locationPatterns);
  if (validationResult && validationResult.error) {
    console.error(validationResult.error.details);
  }
  expect(validationResult.error).toBeFalsy();
  expect(validationResult.warning).toBeFalsy();
  expect(validationResult.value).toBeTruthy();
});
