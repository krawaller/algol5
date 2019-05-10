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

export function iconRef(group, icons) {
  const stripped = group.replace(/["']/g, "");
  return icons[stripped] ? `"${icons[stripped]}"` : `iconMapping[${group}]`;
}
