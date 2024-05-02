import Joi from 'joi'

import jobsData from "./jobs-data.json";
import companiesData from "../companies/companies-data.json";
import departmentsData from "../departments/departments-data.json";

const schema = Joi.array().items(
  Joi.object({
    companyId: Joi.string().valid(
      ...companiesData.map((company) => company.id)
    ),
    department: Joi.any(),
    url: Joi.string().uri().required(),
    id: Joi.string().required(),
    location: Joi.string().required(),
    normalizedLocation: Joi.array()
      .optional()
    ,
    normalizedDepartment: Joi.optional().valid(
      ...departmentsData.map((department) => department.id)
    ),
    title: Joi.string().required(),
    createdAt: Joi.date().timestamp().required(),
    status: Joi.string().optional().valid("disabled"),
    _id: Joi.any(),
    _updatedAt: Joi.any(),
  })
);

test("satisfies the schema", () => {
  const validationResult = schema.validate(jobsData);
  if (validationResult && validationResult.error) {
    console.error(validationResult.error.details);
  }
  expect(validationResult.error).toBeFalsy();
  expect(validationResult.warning).toBeFalsy();
  expect(validationResult.value).toBeTruthy();
});
