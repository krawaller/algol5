import prettier from "prettier";
import { AlgolArrangements } from "../../types";
import { GameId } from "../../games/dist/list";
import marked from "marked";
import fm from "front-matter";
import { insertTokens } from "./md2html.insertTokens";

type Md2htmlOpts = {
  md: string;
  arrs: AlgolArrangements;
  gameId: GameId;
};

export const md2html = (opts: Md2htmlOpts) => {
  const { md: orig, arrs, gameId } = opts;
  const { body: md, attributes: yaml } = fm(orig);
  let ret = md;
  ret = insertTokens({ md, yaml, arrs, gameId });
  const html = `<div>${ret}</div>`;
  const nice = prettier
    .format(html, { filepath: "foo.html" })
    .replace(/\n$/, "");
  return nice;
};
