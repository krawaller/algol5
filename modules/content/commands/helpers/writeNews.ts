import fm from "front-matter";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";

export const writeNews = (id: string) => {
  const source = path.join(__dirname, `../../material/news/${id}`);
  if (!fs.existsSync(source)) {
    throw new Error(`Could not find news "${id}"!`);
  }
  const out = path.join(__dirname, `../../dist/news/${id}`);
  fs.ensureDirSync(out);
  const md = readFileSync(path.join(source, `news.md`)).toString();
  const yaml = fm(md).attributes as any;
  for (const required of [
    "slug",
    "thumbnail",
    "blurb",
    "title",
    "id",
    "mainImage",
    "updated",
  ]) {
    if (!yaml[required]) {
      throw new Error(
        `Have to provide ${required} in yaml data for news ${id}!`
      );
    }
  }
  if (yaml.id !== id) {
    throw new Error(
      `ID doesn't match id for news ${id}! Never change id manually!`
    );
  }
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const thumbPath = path.join(picSourcePath, yaml.thumbnail);
  if (!fs.existsSync(thumbPath)) {
    throw new Error(
      `Failed to find thumbnail "${thumbPath}" in pics folder for news ${id}!`
    );
  }
  const picRefPath = `/images/news/${id}`;
  const mainImagePath = path.join(picSourcePath, yaml.mainImage);
  if (!fs.existsSync(mainImagePath)) {
    throw new Error(
      `Failed to find mainImage "${yaml.mainImage}" in pics folder for news ${id}!`
    );
  }

  const { html, preloads } = md2html({ md, picSourcePath, picRefPath });
  writeFileSync(path.join(out, `news.html`), html);

  const exported = `export const news = \`${html}\`\n`;
  writeFileSync(path.join(out, `news.ts`), exported);

  const date = id.replace(/^news_/, "").replace(/_/g, "-");
  const listing = `export const listing = {
    id: \`${id}\`,
    title: \`${yaml.title || date}\`,
    blurb: \`${yaml.blurb}\`,
    slug: \`${date}_${yaml.slug}\`,
    sort: \`${date}\`,
    created: \`${date}\`,
    updated: \`${yaml.updated || date}\`,
    preloads: ${JSON.stringify(preloads)},
    mainImage: \`/images/news/${date}/${yaml.mainImage}\`,
    thumbnail: \`${yaml.thumbnail}\`,
};
`;
  writeFileSync(path.join(out, "listing.ts"), listing);
  console.log("Wrote news", date);
};
