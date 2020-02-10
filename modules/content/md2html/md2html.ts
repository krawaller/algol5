import prettier from "prettier";
import { AlgolArrangements } from "../../types";
import { GameId } from "../../games/dist/list";
import fm from "front-matter";
import { insertTokens } from "./md2html.insertTokens";
import { processMarkdown } from "./md2html.processMarkdown";

type Md2htmlOpts = {
  md: string;
  arrs?: AlgolArrangements;
  gameId?: GameId;
  picSourcePath: string;
  picRefPath: string;
};

export const md2html = (opts: Md2htmlOpts) => {
  const { md: orig, arrs = {}, gameId, picSourcePath, picRefPath } = opts;
  const { body: md, attributes: yaml } = fm(orig);
  let ret = md;
  ret = insertTokens({ md, yaml, arrs, gameId, picSourcePath, picRefPath });
  ret = processMarkdown({ md: ret });
  const html = `<div>${ret}</div>`;
  const nice = prettier
    .format(html, { filepath: "foo.html" })
    .replace(/\n$/, "");
  return nice;
};
