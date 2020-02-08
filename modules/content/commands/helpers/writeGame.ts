import { GameId } from "../../../games/dist/list";
import { md2html } from "../../md2html";
import path from "path";
import fs, { readFileSync, writeFileSync } from "fs-extra";
import { AlgolArrangements } from "../../../types";

export const writeGame = (gameId: GameId) => {
  const out = path.join(__dirname, `../../dist/games/${gameId}`);
  fs.ensureDirSync(out);
  const source = path.join(__dirname, `../../material/games/${gameId}`);
  const content: Record<string, string> = {};
  const arrs: AlgolArrangements = require(`../../material/games/${gameId}/arrangements`)
    .arrangements;
  const picPath = path.join(source, "pics");
  fs.ensureDirSync(picPath);
  for (const file of ["about", "rules"]) {
    const md = readFileSync(path.join(source, `${file}.md`)).toString();
    const html = md2html({ md, arrs, gameId, picPath });
    writeFileSync(path.join(out, `${file}.html`), html);
    const exported = `export const ${file} = \`${html}\`\n`;
    writeFileSync(path.join(out, `${file}.ts`), exported);
    content[file] = html;
  }
};
