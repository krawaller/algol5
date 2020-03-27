import fm from "front-matter";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { encodePic } from "../../utils";

export const writeNews = (date: string) => {
  const source = path.join(__dirname, `../../material/news/${date}`);
  if (!fs.existsSync(source)) {
    throw new Error(`Could not find news "${date}"!`);
  }
  const out = path.join(__dirname, `../../dist/news/${date}`);
  fs.ensureDirSync(out);
  const md = readFileSync(path.join(source, `news.md`)).toString();
  const yaml = fm(md).attributes as any;
  for (const required of ["slug", "thumbnail", "blurb", "title", "id"]) {
    if (!yaml[required]) {
      throw new Error(
        `Have to provide ${required} in yaml data for news ${date}!`
      );
    }
  }
  if (yaml.id !== date) {
    throw new Error(
      `ID doesn't match date for news ${date}! Never change id manually!`
    );
  }
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const thumbPath = path.join(picSourcePath, yaml.thumbnail);
  if (!fs.existsSync(thumbPath)) {
    throw new Error(
      `Failed to find thumbnail "${thumbPath}" for news ${date}!`
    );
  }
  const thumbdata = encodePic(thumbPath);
  const picRefPath = `/images/news/${date}`;

  const { html, preloads } = md2html({ md, picSourcePath, picRefPath });
  writeFileSync(path.join(out, `news.html`), html);

  const exported = `export const news = \`${html}\`\n`;
  writeFileSync(path.join(out, `news.ts`), exported);

  const listing = `export const listing = {
    id: \`${date}\`,
    title: \`${date}\`,
    blurb: \`${yaml.blurb}\`,
    slug: \`${yaml.slug}\`,
    preloads: ${JSON.stringify(preloads)},
    thumbdata: \`${thumbdata}\`,
};
`;
  writeFileSync(path.join(out, "listing.ts"), listing);
  console.log("Wrote news", date);
};
