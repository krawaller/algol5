import * as path from "path";

import { FullDefAnon, AlgolWriterSuite, ParserTest } from "../../types";
import { truthy, falsy } from "../../common";

export function runSuite<T, U>(suite: AlgolWriterSuite<T, U>) {
  console.log("running", suite.title);
  test(suite.title, () => {
    suite.defs.forEach(tests => {
      runParserTest(tests, suite.func);
    });
  });
}

function runParserTest<T, U>(
  parserTest: ParserTest<T, U>,
  func: (def: FullDefAnon, player: 1 | 2, action: string, input: T) => string
) {
  parserTest.contexts.forEach(({ context, tests }) => {
    tests.forEach(({ expr, res, sample, debug, desc }) => {
      const code = func(
        parserTest.def,
        parserTest.player,
        parserTest.action,
        expr
      );
      let result;
      const fullContext = {
        nextSpawnId: 1,
        roseDirs: [1, 2, 3, 4, 5, 6, 7, 8],
        orthoDirs: [1, 3, 5, 7],
        diagDirs: [2, 4, 6, 8],
        ownerNames:
          parserTest.player === 1
            ? ["neutral", "my", "opp"]
            : ["neutral", "opp", "my"],
        gameDef: parserTest.def,
        ...context
      };
      const pre =
        Object.keys(fullContext).reduce(
          (mem, key) =>
            mem + `let ${key} = ${JSON.stringify(fullContext[key])}; `,
          ""
        ) +
        `
          const {offsetPos, boardConnections, makeRelativeDirs} = require('${path.join(
            __dirname,
            "../../common"
          )}');
          const {collapseContent} = require('${path.join(
            __dirname,
            "../def2code/executors"
          )}');
          const connections = boardConnections(gameDef.board);
          const relativeDirs = makeRelativeDirs(gameDef.board);
        `;
      try {
        eval(
          pre + (sample ? `${code}; result = ${sample};` : `result = ${code};`)
        );
      } catch (e) {
        console.log("KABOOM", code);
        throw e;
      }

      const processedResult =
        (res as unknown) === truthy || (res as unknown) === falsy
          ? !!result
          : result;
      const processedComparator =
        (res as unknown) === truthy
          ? true
          : (res as unknown) === falsy
          ? false
          : res;
      expect(processedResult).toEqual(processedComparator);
      if (debug) {
        console.log(
          "CODE",
          code,
          "exp",
          res,
          "pexp",
          processedComparator,
          "result",
          result,
          "presult",
          processedResult
        );
      }
    });
  });
}
