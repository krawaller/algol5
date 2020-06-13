import fm from "front-matter";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";

export const writeChunk = (id: string) => {
  const source = path.join(__dirname, `../../material/chunks/${id}`);
  if (!fs.existsSync(source)) {
    throw new Error(`Could not find chunk "${id}"!`);
  }
  const out = path.join(__dirname, `../../dist/chunks/${id}`);
  fs.ensureDirSync(out);
  const md = readFileSync(path.join(source, `chunk.md`)).toString();
  const yaml = fm(md).attributes as any;
  for (const required of ["id"]) {
    if (!yaml[required]) {
      throw new Error(
        `Have to provide ${required} in yaml data for chunk ${id}!`
      );
    }
  }
  if (yaml.id !== id) {
    throw new Error(`ID in yaml "${yaml.id}" doesn't match ${id}!`);
  }
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const picRefPath = `/images/chunks/${id}`;
  if (yaml.mainImage) {
    const mainImagePath = path.join(picSourcePath, yaml.mainImage);
    if (!fs.existsSync(mainImagePath)) {
      throw new Error(
        `Failed to find mainImage "${yaml.mainImage}" in pics folder for chunk ${id}!`
      );
    }
    yaml.mainImage = `/images/chunks/${id}/${yaml.mainImage}`;
  }

  const { html, preloads } = md2html({ md, picSourcePath, picRefPath });
  writeFileSync(path.join(out, `chunk.html`), html);

  const exported = `export const chunk = \`${html}\`\n; export default chunk;`;
  writeFileSync(path.join(out, `chunk.ts`), exported);

  const info = `export const info = ${JSON.stringify(yaml)};
export default info;
`;
  writeFileSync(path.join(out, "info.ts"), info);
  if (fs.existsSync(picSourcePath)) {
    fs.copySync(picSourcePath, path.join(out, "pics"));
  }
  console.log("Wrote chunk", id);
};
