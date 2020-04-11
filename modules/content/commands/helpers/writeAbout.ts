import fm from "front-matter";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { encodePic } from "../../utils";

export const writeAbout = (id: string) => {
  const source = path.join(__dirname, `../../material/about/${id}`);
  if (!fs.existsSync(source)) {
    throw new Error(`Could not find about article "${id}"!`);
  }
  const out = path.join(__dirname, `../../dist/about/${id}`);
  fs.ensureDirSync(out);
  const md = readFileSync(path.join(source, `about.md`)).toString();
  const yaml = fm(md).attributes as any;
  for (const required of [
    "slug",
    "thumbnail",
    "blurb",
    "updated",
    "title",
    "id",
    "mainImage",
    "sort",
  ]) {
    if (!yaml[required]) {
      throw new Error(
        `Have to provide ${required} in yaml data for about article ${id}!`
      );
    }
  }
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const thumbPath = path.join(picSourcePath, yaml.thumbnail);
  if (!fs.existsSync(thumbPath)) {
    throw new Error(
      `Failed to find thumbnail "${thumbPath}" in pics folder for about article ${id}!`
    );
  }
  const thumbdata = encodePic(thumbPath);
  const picRefPath = `/images/about/${id}`;
  const mainImagePath = path.join(picSourcePath, yaml.mainImage);
  if (!fs.existsSync(mainImagePath)) {
    throw new Error(
      `Failed to find mainImage "${yaml.mainImage}" in pics folder for about article ${id}!`
    );
  }

  const { html, preloads } = md2html({ md, picSourcePath, picRefPath });
  writeFileSync(path.join(out, `about.html`), html);

  const exported = `export const about = \`${html}\`\n`;
  writeFileSync(path.join(out, `about.ts`), exported);

  const listing = `export const listing = {
    id: \`${id}\`,
    title: \`${yaml.title || id}\`,
    blurb: \`${yaml.blurb}\`,
    slug: \`${yaml.slug}\`,
    sort: \`${yaml.sort}\`,
    created: \`${id}\`,
    updated: \`${yaml.updated || id}\`,
    preloads: ${JSON.stringify(preloads)},
    mainImage: \`/images/about/${id}/${yaml.mainImage}\`,
    thumbdata: \`${thumbdata}\`,
};
`;
  writeFileSync(path.join(out, "listing.ts"), listing);
  console.log("Wrote about", id);
};
