import * as isEqual from "lodash.isequal";

export function contains(haystack, needle): boolean {
  if (!haystack) {
    return false;
  } else if (isEqual(needle, haystack)) {
    return true;
  } else if (typeof haystack === "object") {
    return Object.keys(haystack).some(key => contains(haystack[key], needle));
  } else {
    return false;
  }
}
