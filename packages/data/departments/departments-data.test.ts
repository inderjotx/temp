import Joi from 'joi'

import departmentsData from "./departments-data.json";

const schema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    label: Joi.string().required(),
  })
);

test("satisfies the schema", () => {
  const validationResult = schema.validate(departmentsData);
  if (validationResult && validationResult.error) {
    console.error(validationResult.error.details);
  }
  expect(validationResult.error).toBeFalsy();
  expect(validationResult.warning).toBeFalsy();
  expect(validationResult.value).toBeTruthy();
});
