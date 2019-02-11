import { FullDefAnon, TestSuite, ParserTest } from "../../types";
import { truthy, falsy } from "../../common";
import { getSuites } from "./_testUtils";
import { printSuite } from "./_printSuite";

import * as _eval from "eval";
import * as test from "tape";

getSuites().then(suiteFiles => {
  suiteFiles.forEach(f => {
    try {
      const { testSuite } = require(f);
      try {
        runSuite(testSuite);
        printSuite(testSuite);
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

function runSuite<T>(suite: TestSuite<T>) {
  test(suite.title, t => {
    suite.defs.forEach(tests => {
      runParserTest(tests, suite.func, t);
    });
    t.end();
  });
}

function runParserTest<T>(
  parserTest: ParserTest<T>,
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
          const {offsetPos, boardConnections} = require('../../common');
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
        res === truthy || res === falsy ? !!result : result;
      const processedComparator =
        res === truthy ? true : res === falsy ? false : res;
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
