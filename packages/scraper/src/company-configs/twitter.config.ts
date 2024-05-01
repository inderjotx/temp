import { locationIds } from "@remotebear/data-api";
import { locationLooselyIncludes } from "@remotebear/normalizer";

const remoteLocations = [
  "careers-twitter:sr/office/remote-australia",
  "careers-twitter:sr/office/remote-canada",
  "careers-twitter:sr/office/remote-great-britain",
  "careers-twitter:sr/office/remote-japan",
  "careers-twitter:sr/office/remote-scotland",
  "careers-twitter:sr/office/remote-singapore",
  "careers-twitter:sr/office/remote-us",
];

function getUrl(
  location: string,
  offset = 0,
  limit = 100,
  department = "Engineering, Developer"
) {
  return encodeURI(
    `https://careers.twitter.com` +
    `/content/careers-twitter/en/roles.careers.search.json` +
    `?location=${location}` +
    `&q=${department}` +
    `&offset=${offset}` +
    `&limit=${limit}` +
    `&sortBy=modified` +
    `&asc=false`
  );
}

function makeArrayUniqueBy(array: any[], property = "id") {
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

export async function scrapeJobs() {
  const result = [];
  for (let location of remoteLocations) {
    let totalRead = 0;
    let jobsByLocation: any[] = [];
    let data: { results: any[], pageCount: number, totalCount: number } = { results: [], pageCount: 0, totalCount: 0 };
    do {
      const response = await fetch(getUrl(location, totalRead));
      data = await response.json();
      const jobsByCall = data.results.map((job) => {
        return {
          department: job.teams.length > 0 ? job.teams[0].title : "",
          url: job.url,
          id: job.url,
          location: job.locations.map(({ title }: { title: string }) => title).join(", "),
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

export function getNormalizedLocation({ location }: { location: string }) {
  const normalizedLocation = [];
  if (locationLooselyIncludes(location, ["remote us", "remote scotland"])) {
    normalizedLocation.push(locationIds.us);
  }
  if (locationLooselyIncludes(location, "remote australia")) {
    normalizedLocation.push(locationIds.australia);
  }
  if (locationLooselyIncludes(location, ["remote japan", "ghana remote"])) {
    normalizedLocation.push(locationIds.other);
  }
  if (locationLooselyIncludes(location, "remote singapore")) {
    normalizedLocation.push(locationIds.other);
  }
  if (locationLooselyIncludes(location, "remote canada")) {
    normalizedLocation.push(locationIds.canada);
  }
  if (
    locationLooselyIncludes(location, [
      "remote great britain",
      "remote netherlands",
    ])
  ) {
    normalizedLocation.push(locationIds.eu);
  }
  return normalizedLocation;
}

