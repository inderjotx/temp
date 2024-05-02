import departmentsData from "@tokenjobs/data/departments/departments-data.json";

export const departmentIds = departmentsData.reduce((acc, department) => {
  acc[department.id] = department.id;
  return acc;
}, {} as Record<string, string>);


export const allDepartments = departmentsData
