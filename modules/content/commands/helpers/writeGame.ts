import { GameId } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { AlgolArrangements, AlgolGameBlobAnon } from "../../../types";

export const writeGame = async (gameId: GameId) => {
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
      // const date = meta[gameId].added;
      // md +=
      //   "\n\n" +
      //   (date === "GENESIS"
      //     ? meta[gameId].name +
      //       " has been included in Chessicals since the beginning."
      //     : meta[gameId].name + " was added to Chessicals " + date + ".");
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
  fs.copySync(picSourcePath, path.join(out, "pics"));
};
