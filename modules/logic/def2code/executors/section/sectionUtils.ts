export function ifCodeContains(
  code: string,
  lines: { [needle: string]: string }
) {
  return Object.keys(lines).reduce(
    (mem, needle) => (code.match(needle) ? mem + " " + lines[needle] : mem),
    ""
  );
}
