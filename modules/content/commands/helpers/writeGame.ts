import { GameId } from "../../../games/dist/list";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { AlgolArrangements, AlgolGameBlobAnon } from "../../../types";

export const writeGame = async (gameId: GameId) => {
  // have to do this async for writeNews to work
  const { games2news, newsWithGames } = await import("../../dist/games2news");
  const out = path.join(__dirname, `../../dist/games/${gameId}`);
  fs.ensureDirSync(out);
  const source = path.join(__dirname, `../../material/games/${gameId}`);
  const content: Record<string, string> = {};
  const arrs: AlgolArrangements<AlgolGameBlobAnon> = require(`../../material/games/${gameId}/arrangements`)
    .arrangements;
  const links: Record<
    string,
    string
  > = require(`../../material/games/${gameId}/links`).links;
  const picSourcePath = path.join(source, "pics");
  fs.ensureDirSync(picSourcePath);
  const allGamePreloads = [];
  for (const file of ["about", "rules"]) {
    let md = readFileSync(path.join(source, `${file}.md`)).toString();
    if (file === "about") {
      const newsItems: { slug: string; title: string }[] = (
        games2news[gameId] || []
      ).map(newsId => newsWithGames[newsId]);
      if (newsItems.length) {
        md +=
          `\n\nRelated news items:\n\n` +
          newsItems
            .map(
              ({ slug, title }) =>
                // TODO - convert to token?
                `- <a class="md-news-link" href="/news/${slug}" data-newsslug="${slug}">${title}</a>`
            )
            .join("\n");
      }
      const entries = Object.entries(links);
      if (entries.length) {
        md +=
          `\n\nExternal links:\n\n` +
          entries
            .map(
              ([text, url]) =>
                `- {EXTLINK:text=${text},url=${url.replace(/=/g, "EQUALS")}}`
            )
            .join("\n");
      }
    }
    const picRefPath = `/images/games/${gameId}/`;
    const { html, preloads, updated } = md2html({
      md,
      arrs,
      gameId,
      picSourcePath,
      picRefPath,
    });
    allGamePreloads.push(...preloads);
    writeFileSync(path.join(out, `${file}.html`), html);
    const exported = `export const ${file} = {
  updated: "${updated}",
  html: \`${html}\`
}\n`;
    writeFileSync(path.join(out, `${file}.ts`), exported);
    content[file] = html;
  }
  writeFileSync(
    path.join(out, "preloads.ts"),
    `export const preloads = ${JSON.stringify(allGamePreloads)};\n`
  );
};
