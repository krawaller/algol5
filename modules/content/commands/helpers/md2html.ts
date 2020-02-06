import prettier from "prettier";

export const md2html = (md: string) => {
  const html = `<div>${md}</div>`;
  const nice = prettier
    .format(html, { filepath: "foo.html" })
    .replace(/\n$/, "");
  return nice;
};
