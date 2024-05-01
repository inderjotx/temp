import { Job, Company } from "types";

type NormalizationResult = {
  input: string;
  output: string | string[];
  successful: boolean;
  jobsCount: number;
};

type CompanyResult = {
  normalizations: NormalizationResult[];
  jobsCount: number;
  successfulJobNormalizationsCount: number;
  successfulJobNormalizationsRate: number;
};

type GlobalResults = {
  jobsCount: number;
  successfulJobNormalizationsCount: number;
};

type Results = {
  globalResults: GlobalResults;
  resultsByCompanyId: Record<string, CompanyResult>;
};

export function validateNormalization({
  jobs,
  allCompanies,
  fieldName,
  getNormalizedValue,
}: {
  jobs: Job[];
  allCompanies: Company[];
  fieldName: keyof Job
  getNormalizedValue: (job: Job) => string | string[] | undefined;
}): Results {
  const resultsByCompanyId: Record<string, CompanyResult> = {};

  allCompanies.forEach((company) => {
    const companyResult: CompanyResult = (resultsByCompanyId[company.id] = {
      normalizations: [],
      jobsCount: 0,
      successfulJobNormalizationsCount: 0,
      successfulJobNormalizationsRate: 0,
    });

    const companyJobs = jobs.filter((job) => job.companyId === company.id);

    companyResult.jobsCount = companyJobs.length;

    companyJobs.forEach((job) => {
      const existingNormalization = companyResult.normalizations.find(
        (result) => result.input === job[fieldName]
      );

      if (existingNormalization) {
        existingNormalization.jobsCount++;
      } else {
        const output = getNormalizedValue(job);
        const successful =
          output !== undefined &&
          (Array.isArray(output) ? output.length > 0 : output !== "");

        companyResult.normalizations.push({
          input: job[fieldName] as string,
          output: output || [],
          successful,
          jobsCount: 1,
        });
      }
    });

    companyResult.successfulJobNormalizationsCount = companyResult.normalizations
      .filter((normalization) => normalization.successful)
      .map((normalization) => normalization.jobsCount)
      .reduce((a, b) => a + b, 0);

    companyResult.successfulJobNormalizationsRate =
      companyResult.successfulJobNormalizationsCount / companyResult.jobsCount;
  });

  const globalResults: GlobalResults = {
    jobsCount: Object.values(resultsByCompanyId).reduce(
      (total, companyResult) => total + companyResult.jobsCount,
      0
    ),
    successfulJobNormalizationsCount: Object.values(resultsByCompanyId).reduce(
      (total, companyResult) =>
        total + companyResult.successfulJobNormalizationsCount,
      0
    ),
  };

  return { globalResults, resultsByCompanyId };
}