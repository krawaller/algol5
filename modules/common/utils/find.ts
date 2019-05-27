import isEqual from "lodash.isequal";

export type Find = { value: any; path: (string | number)[] };

export function find(haystack, needle) {
  return findInner(haystack, needle, []);
}

function findInner(haystack, needle, path): Find[] {
  if (!haystack) {
    return [];
  } else if (
    typeof needle === "function"
      ? needle(haystack, path)
      : isEqual(needle, haystack)
  ) {
    return [{ value: needle, path }];
  } else if (typeof haystack === "object") {
    return Object.keys(haystack).reduce(
      (mem, key) =>
        mem.concat(findInner(haystack[key], needle, path.concat(key))),
      []
    );
  } else {
    return [];
  }
}
