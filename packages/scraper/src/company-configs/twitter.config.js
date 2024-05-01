"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedLocation = exports.scrapeJobs = void 0;
const data_api_1 = require("@remotebear/data-api");
const normalizer_1 = require("@remotebear/normalizer");
const remoteLocations = [
    "careers-twitter:sr/office/remote-australia",
    "careers-twitter:sr/office/remote-canada",
    "careers-twitter:sr/office/remote-great-britain",
    "careers-twitter:sr/office/remote-japan",
    "careers-twitter:sr/office/remote-scotland",
    "careers-twitter:sr/office/remote-singapore",
    "careers-twitter:sr/office/remote-us",
];
function getUrl(location, offset = 0, limit = 100, department = "Engineering, Developer") {
    return encodeURI(`https://careers.twitter.com` +
        `/content/careers-twitter/en/roles.careers.search.json` +
        `?location=${location}` +
        `&q=${department}` +
        `&offset=${offset}` +
        `&limit=${limit}` +
        `&sortBy=modified` +
        `&asc=false`);
}
function makeArrayUniqueBy(array, property = "id") {
    let set = new Set();
    let uniqueArray = array.filter((item) => {
        if (!set.has(item[property])) {
            set.add(item[property]);
            return true;
        }
        return false;
    });
    return uniqueArray;
}
async function scrapeJobs() {
    const result = [];
    for (let location of remoteLocations) {
        let totalRead = 0;
        let jobsByLocation = [];
        let data = { results: [], pageCount: 0, totalCount: 0 };
        do {
            const response = await fetch(getUrl(location, totalRead));
            data = await response.json();
            const jobsByCall = data.results.map((job) => {
                return {
                    department: job.teams.length > 0 ? job.teams[0].title : "",
                    url: job.url,
                    id: job.url,
                    location: job.locations.map(({ title }) => title).join(", "),
                    title: job.title,
                    _updatedAt: new Date(job.modified).getTime(),
                };
            });
            jobsByLocation = [...jobsByLocation, ...jobsByCall];
            totalRead += data.pageCount;
        } while (totalRead < data.totalCount);
        result.push(...jobsByLocation);
    }
    return makeArrayUniqueBy(result);
}
exports.scrapeJobs = scrapeJobs;
function getNormalizedLocation({ location }) {
    const normalizedLocation = [];
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote us", "remote scotland"])) {
        normalizedLocation.push(data_api_1.locationIds.us);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, "remote australia")) {
        normalizedLocation.push(data_api_1.locationIds.australia);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, ["remote japan", "ghana remote"])) {
        normalizedLocation.push(data_api_1.locationIds.other);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, "remote singapore")) {
        normalizedLocation.push(data_api_1.locationIds.other);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, "remote canada")) {
        normalizedLocation.push(data_api_1.locationIds.canada);
    }
    if ((0, normalizer_1.locationLooselyIncludes)(location, [
        "remote great britain",
        "remote netherlands",
    ])) {
        normalizedLocation.push(data_api_1.locationIds.eu);
    }
    return normalizedLocation;
}
exports.getNormalizedLocation = getNormalizedLocation;
