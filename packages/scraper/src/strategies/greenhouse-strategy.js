"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobsFromGreenhouse = void 0;
async function getJobsFromGreenhouse(greenhouseCompanyId) {
    const responseRaw = await fetch(`https://api.greenhouse.io/v1/boards/${greenhouseCompanyId}/embed/departments`);
    const response = await responseRaw.json();
    const data = response.departments.flatMap((department) => {
        return department.jobs.map((jobInfo) => {
            return {
                department: department.name,
                url: jobInfo.absolute_url,
                id: `${jobInfo.id}`,
                location: jobInfo.location.name,
                title: jobInfo.title,
                _id: jobInfo.internal_job_id,
                _updatedAt: new Date(jobInfo.updated_at).getTime(),
            };
        });
    });
    return data;
}
exports.getJobsFromGreenhouse = getJobsFromGreenhouse;
