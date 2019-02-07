export function contains(haystack, needle): boolean {
  if (!haystack) {
    return false;
  } else if (JSON.stringify(needle) === JSON.stringify(haystack)) {
    return true;
  } else if (typeof haystack === "object") {
    return (
      Object.keys(haystack).findIndex(key => contains(haystack[key], needle)) >
      -1
    );
  } else {
    return false;
  }
}
