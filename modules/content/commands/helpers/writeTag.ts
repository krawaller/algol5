import fm from "front-matter";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { encodePic } from "../../utils";

export const writeTag = (id: string) => {
  const source = path.join(__dirname, `../../material/tags/${id}`);
  if (!fs.existsSync(source)) {
    throw new Error(`Could not find tag "${id}"!`);
  }
  const out = path.join(__dirname, `../../dist/tags/${id}`);
  fs.ensureDirSync(out);
  const md = readFileSync(path.join(source, `tag.md`)).toString();
  const yaml = fm(md).attributes as any;
  for (const required of [
    "slug",
    "thumbnail",
    "blurb",
    "title",
    "id",
    "mainImage",
    "updated",
    "sort",
  ]) {
    if (!yaml[required]) {
      throw new Error(
        `Have to provide ${required} in yaml data for tag ${id}!`
      );
    }
  }
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const thumbPath = path.join(picSourcePath, yaml.thumbnail);
  if (!fs.existsSync(thumbPath)) {
    throw new Error(
      `Failed to find thumbnail "${thumbPath}" in pics folder for tag ${id}!`
    );
  }
  const thumbdata = encodePic(thumbPath);
  const picRefPath = `/images/tags/${id}`;
  const mainImagePath = path.join(picSourcePath, yaml.mainImage);
  if (!fs.existsSync(mainImagePath)) {
    throw new Error(
      `Failed to find mainImage "${yaml.mainImage}" in pics folder for tag ${id}!`
    );
  }

  const { html, preloads } = md2html({ md, picSourcePath, picRefPath });
  writeFileSync(path.join(out, `tag.html`), html);

  const exported = `export const tag = \`${html}\`\n`;
  writeFileSync(path.join(out, `tag.ts`), exported);

  const listing = `export const listing = {
    id: \`${id}\`,
    title: \`${yaml.title || id}\`,
    blurb: \`${yaml.blurb}\`,
    slug: \`${yaml.slug}\`,
    sort: \`${yaml.sort}\`,
    created: \`${yaml.created}\`,
    updated: \`${yaml.updated || id}\`,
    preloads: ${JSON.stringify(preloads)},
    mainImage: \`/images/tags/${id}/${yaml.mainImage}\`,
    thumbdata: \`${thumbdata}\`,
};
`;
  writeFileSync(path.join(out, "listing.ts"), listing);
  console.log("Wrote tag", id);
};
