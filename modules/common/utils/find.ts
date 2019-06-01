import isEqual from "lodash.isequal";

export type Find = { value: any; path: (string | number)[] };

export function find(haystack: any, needle: any) {
  return findInner(haystack, needle, []);
}

function findInner(haystack: any, needle: any, path: string[]): Find[] {
  if (!haystack) {
    return [];
  } else if (
    typeof needle === "function"
      ? needle(haystack, path)
      : isEqual(needle, haystack)
  ) {
    return [{ value: haystack, path }];
  } else if (typeof haystack === "object") {
    return Object.keys(haystack).reduce(
      (mem, key) =>
        mem.concat(findInner(haystack[key], needle, path.concat(key))),
      [] as Find[]
    );
  } else {
    return [];
  }
}
