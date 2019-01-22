import { FullDefAnon } from "../../types";
import makeParser from "../def2code2/expressions";
import * as _eval from "eval";

export type ParserTest<T> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: ContextTest<T>[];
};

export type ContextTest<T> = {
  context: { [idx: string]: any };
  tests: ExpressionTest<T>[];
};

export type ExpressionTest<T> = {
  expr: T;
  res: any;
};

export function run<T>(parserTests: ParserTest<T>[], type, t) {
  parserTests.forEach(parserTest =>
    parserTest.contexts.forEach(({ context, tests }) => {
      const parser = makeParser(
        parserTest.def,
        parserTest.player,
        parserTest.action
      )[type];
      tests.forEach(({ expr, res }) => {
        const code = parser(expr);
        const result = _eval(`module.exports = ${code};`, context);
        t.equal(
          result,
          res,
          `Evaluated ${JSON.stringify(expr)} to ${JSON.stringify(res)}`
        );
      });
    })
  );
}

export const emptyFullDef: FullDefAnon = {
  generators: {},
  AI: {
    aspects: {},
    brains: {},
    generators: {},
    grids: {},
    terrain: {}
  },
  board: {
    height: 5,
    width: 5,
    terrain: {}
  },
  instructions: {},
  flow: {
    commands: {},
    marks: {}
  },
  graphics: {
    icons: {},
    tiles: {}
  },
  meta: {},
  scripts: {},
  setup: {}
};
