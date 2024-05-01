
import { allDepartments } from "@remotebear/data-api/src/departments"

export const departmentIds = allDepartments.reduce((acc, department) => {
  acc[department.id] = department.id;
  return acc;
}, {} as Record<string, string>);

function sanitizeString(str: string) {
  return (str || "").toLowerCase().replace(/[^a-zA-Z0-9 ]+/g, "");
}

function stringIncludes(str: string, cases: string | string[]) {
  return Array.isArray(cases)
    ? cases.some((x) => sanitizeString(str).includes(sanitizeString(x)))
    : sanitizeString(str).includes(sanitizeString(cases));
}

function isDepartmentEngineering(job: { department: string, title: string }) {
  return (
    stringIncludes(job.department, "engineer") ||
    stringIncludes(job.title, [
      "engineer",
      "sre",
      "devops",
      "sysadmin",
      "developer",
      "solutions architect",
    ])
  );
}

export function getNormalizedDepartment(job: { department: string, title: string }) {
  if (isDepartmentEngineering(job)) {
    return departmentIds.engineering;
  }
  return undefined;
}
