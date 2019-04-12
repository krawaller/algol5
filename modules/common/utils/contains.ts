import * as isEqual from "lodash.isequal";

export function contains(haystack, needle) {
  return containsInner(haystack, needle, []);
}

function containsInner(haystack, needle, path): boolean {
  if (!haystack) {
    return false;
  } else if (
    typeof needle === "function"
      ? needle(haystack, path)
      : isEqual(needle, haystack)
  ) {
    return true;
  } else if (typeof haystack === "object") {
    return Object.keys(haystack).some(key =>
      containsInner(haystack[key], needle, path.concat(key))
    );
  } else {
    return false;
  }
}
