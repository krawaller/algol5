import { FullDefAnon, AlgolWriterSuite, ParserTest } from "../../types";
import { truthy, falsy, relativeDirs } from "../../common";
import { getSuites } from "./_testUtils";

import * as _eval from "eval";
import * as test from "tape";

getSuites().then(suiteFiles => {
  suiteFiles.forEach(f => {
    try {
      const { testSuite } = require(f);
      try {
        runSuite(testSuite);
      } catch (e) {
        console.log("Failed to run spec from", f, e);
        throw e;
      }
    } catch (e) {
      console.log("Failed to get spec from", f, e);
      throw e;
    }
  });
});

// --------------------------------------------------------

function runSuite<T, U>(suite: AlgolWriterSuite<T, U>) {
  test(suite.title, t => {
    suite.defs.forEach(tests => {
      runParserTest(tests, suite.func, t);
    });
    t.end();
  });
}

function runParserTest<T, U>(
  parserTest: ParserTest<T, U>,
  func: (def: FullDefAnon, player: 1 | 2, action: string, input: T) => string,
  t
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
      const pre = `
          const {offsetPos, boardConnections} = require('../common');
          const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
          const diagDirs = [2, 4, 6, 8];
          const orthoDirs = [1, 3, 5, 7];
          const relativeDirs = ${JSON.stringify(relativeDirs)};
          const ownerNames = ${JSON.stringify(
            parserTest.player === 1
              ? ["neutral", "my", "opp"]
              : ["neutral", "opp", "my"]
          )};
          let nextSpawnId = 1;
          const connections = boardConnections(${JSON.stringify(
            parserTest.def.board
          )});
        `;
      try {
        result = _eval(
          pre +
            (sample
              ? `${code}; module.exports = ${sample};`
              : `module.exports = ${code};`),
          "somefile.js",
          {
            gameDef: parserTest.def,
            ...JSON.parse(JSON.stringify(context))
          },
          true
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
      t[typeof res === "object" ? "deepEqual" : "equal"](
        processedResult,
        processedComparator,
        desc
          ? desc
          : sample
          ? `Ran ${JSON.stringify(expr)} and evaluated ${JSON.stringify(
              sample
            )} to ${JSON.stringify(res)}`
          : `Evaluated ${JSON.stringify(expr)} to ${JSON.stringify(res)}`
      );
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
