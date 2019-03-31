import * as path from "path";

import { AlgolSuite, isAlgolExpressionTest } from "../../types";
import { truthy, falsy } from "../../common";

export function runSuite<T, U>(suite: AlgolSuite) {
  test(suite.title, () => {
    for (const { def, player, action, contexts, skip } of suite.defs) {
      if (!skip) {
        for (const { context, tests, skip, envelope } of contexts) {
          if (!skip) {
            for (const suiteTest of tests) {
              let results = [];
              if (!suiteTest.skip) {
                const code = suite.func(def, player, action, suiteTest.expr);
                const fullContext = {
                  roseDirs: [1, 2, 3, 4, 5, 6, 7, 8],
                  orthoDirs: [1, 3, 5, 7],
                  diagDirs: [2, 4, 6, 8],
                  ownerNames:
                    player === 1
                      ? ["neutral", "my", "opp"]
                      : ["neutral", "opp", "my"],
                  gameDef: def,
                  ...context
                };
                const pre =
                  `
                  const references = {
                    ${Object.keys(fullContext).reduce(
                      (mem, key) =>
                        mem + `${key}: ${JSON.stringify(fullContext[key])}, `,
                      ""
                    )}
                  };
                  ` +
                  Object.keys(fullContext).reduce(
                    (mem, key) => mem + `let ${key} = references.${key}; `,
                    ""
                  ) +
                  `
                    const {offsetPos, boardConnections, makeRelativeDirs, deduceInitialUnitData} = require('${path.join(
                      __dirname,
                      "../../common"
                    )}');
                    const {collapseContent} = require('${path.join(
                      __dirname,
                      "../def2code/executors"
                    )}');
                    const connections = boardConnections(gameDef.board);
                    const relativeDirs = makeRelativeDirs(gameDef.board);
                  ` +
                  (envelope || "");
                let body = isAlgolExpressionTest(suiteTest)
                  ? `results[0] = ${code}`
                  : `${code.replace(
                      /return *([^;]*;\W*)$/,
                      "const returnVal = $1"
                    )}; ` +
                    suiteTest.asserts
                      .map((assert, n) => `results[${n}] = ${assert.sample};`)
                      .join("; ");
                try {
                  eval(pre + " " + body);
                } catch (e) {
                  console.log("KABOOM", body);
                  throw e;
                }
                type check = {
                  res: any;
                  desc?: string;
                  debug?: boolean;
                  skip?: boolean;
                };
                const checks: check[] = isAlgolExpressionTest(suiteTest)
                  ? [
                      {
                        res: suiteTest.res,
                        desc: suiteTest.desc,
                        debug: suiteTest.debug
                      }
                    ]
                  : suiteTest.asserts;
                checks.forEach(({ res, desc, debug, skip }, n) => {
                  if (!skip) {
                    const processedResult =
                      (res as unknown) === truthy || (res as unknown) === falsy
                        ? !!results[n]
                        : results[n];
                    const processedComparator =
                      (res as unknown) === truthy
                        ? true
                        : (res as unknown) === falsy
                        ? false
                        : res;
                    if (debug) {
                      console.log(
                        "CODE",
                        code,
                        "exp",
                        res,
                        "pexp",
                        processedComparator,
                        "result",
                        results[n],
                        "presult",
                        processedResult
                      );
                    }
                    expect(processedResult).toEqual(processedComparator);
                  }
                });
              }
            }
          }
        }
      }
    }
  });
}
