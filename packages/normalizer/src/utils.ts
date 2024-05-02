
export function uniq(arr: string[]) {
  return [...new Set(arr)];
}

export function sanitizeLocation(location: string) {
  return location
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]+/g, "")
    .replace(/  +/g, " ")
    .trim();
}

export function keywordifyLocation(location: string) {
  const removableKeywords = [
    "or",
    "in",
    "the",
    "east",
    "eastern",
    "west",
    "western",
    "hq",
    "hemisphere",
    "north",
    "only",
    "within",
    "central",
    "coast",
  ];
  return uniq(sanitizeLocation(location).split(" "))
    .filter((keyword) => !removableKeywords.includes(keyword))
    .sort();
}

export function locationLooselyMatches(location: string, cases: string | string[]) {
  cases = typeof cases === "string" ? [cases] : cases;
  return cases.map(sanitizeLocation).includes(sanitizeLocation(location));
}

export function locationKeywordsLooselyMatch(location: string, cases: string | string[]) {
  cases = typeof cases === "string" ? [cases] : cases;
  const locationKeywords = keywordifyLocation(location);
  return cases.some(
    (x) => keywordifyLocation(x).toString() === locationKeywords.toString()
  );
}

export function locationLooselyIncludes(location: string, cases: string | string[]) {
  cases = typeof cases === "string" ? [cases] : cases;
  return cases.some((x) =>
    sanitizeLocation(location).includes(sanitizeLocation(x))
  );
}

export function locationLooselyStartsWith(location: string, cases: string | string[]) {
  cases = typeof cases === "string" ? [cases] : cases;
  return cases.some((x) =>
    sanitizeLocation(location).startsWith(sanitizeLocation(x))
  );
}

export function locationLooselyEndsWith(location: string, cases: string | string[]) {
  cases = typeof cases === "string" ? [cases] : cases;
  return cases.some((x) =>
    sanitizeLocation(location).endsWith(sanitizeLocation(x))
  );
}


export function getLocation(location: string, patterns: string | string[]) {

  patterns = typeof patterns === "string" ? [patterns] : patterns;
  return patterns.map(sanitizeLocation).some((pattern) => sanitizeLocation(location).includes(pattern));

}


// wrong us means if  answer   is aUStralia but since australia has us , us is wrongly mathched , samae goes with russia ...etc
export function remoteWrongUS(arr: string[]) {


  let hasUs = false;

  arr.forEach((x) => {
    if (x !== "us" && x.toLowerCase().includes("us")) {
      hasUs = true;
    }
  })

  if (hasUs) {
    return arr.filter((x) => x !== "us");
  }

  else {
    return arr;
  }

}