import * as path from "path";

import { AlgolSuite, isAlgolExpressionTest } from "../../types";
import { truthy, falsy, groupLayersForPlayer } from "../../common";

export function runSuite<T, U>(suite: AlgolSuite) {
  test(suite.title, () => {
    for (const {
      def,
      player: defPlayer,
      action: defAction,
      ruleset: defRuleset,
      contexts,
      skip,
    } of suite.defs) {
      if (!skip) {
        for (const {
          context,
          tests,
          skip,
          envelope,
          player: ctxPlayer,
          action: ctxAction,
          ruleset: ctxRuleset,
        } of contexts) {
          if (!skip) {
            for (const suiteTest of tests) {
              let results: any[] = [];
              if (!suiteTest.skip) {
                const player = suiteTest.player || ctxPlayer || defPlayer || 1;
                const action =
                  suiteTest.action || ctxAction || defAction || "action";
                const ruleset =
                  suiteTest.ruleset || ctxRuleset || defRuleset || "basic";
                const code = suite.func(
                  def,
                  player,
                  action,
                  ruleset,
                  suiteTest.expr
                );
                const extraContext = suiteTest.naked
                  ? {}
                  : {
                      roseDirs: [1, 2, 3, 4, 5, 6, 7, 8],
                      orthoDirs: [1, 3, 5, 7],
                      diagDirs: [2, 4, 6, 8],
                      knightDirs: [
                        "d1f2r1",
                        "d1f2r-1",
                        "d3f2r1",
                        "d3f2r-1",
                        "d5f2r1",
                        "d5f2r-1",
                        "d7f2r1",
                        "d7f2r-1",
                      ],
                      ownerNames:
                        player === 1
                          ? ["neutral", "my", "opp"]
                          : ["neutral", "opp", "my"],
                      gameDef: def,
                      dimensions: {
                        height: def.boards.basic.height,
                        width: def.boards.basic.width,
                      },
                      TERRAIN1: undefined,
                      TERRAIN2: undefined,
                    };
                const fullContext = {
                  ...extraContext,
                  ...context,
                };
                let pre =
                  `
                  const references = {
                    ${Object.keys(fullContext).reduce(
                      (mem, key) =>
                        mem +
                        `${key}: ${JSON.stringify(
                          fullContext[key as keyof typeof fullContext]
                        )}, `,
                      ""
                    )}
                  };
                  ` +
                  Object.keys(fullContext).reduce(
                    (mem, key) => mem + `let ${key} = references.${key}; `,
                    ""
                  );
                pre += `
                    const {offsetPos, boardConnections, makeRelativeDirs, setup2army, boardLayers, terrainLayers, collapseContent, makeGrids} = require('${path.join(
                      __dirname,
                      "../../common"
                    )}');`;

                if (!suiteTest.naked) {
                  pre += `
                  const connections = boardConnections(gameDef.boards.basic);
                  const relativeDirs = makeRelativeDirs(gameDef.boards.basic);
                  const emptyObj = {};
                  `;
                  pre += `const groupLayers1 = ${JSON.stringify(
                    groupLayersForPlayer(def, 1)
                  )}; `;
                  pre += `const groupLayers2 = ${JSON.stringify(
                    groupLayersForPlayer(def, 2)
                  )}; `;
                  pre += `const iconMapping = gameDef.graphics.icons; `;
                }

                pre += envelope || "";
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
                  eval(`${pre} { ${body} }`);
                } catch (e) {
                  console.log("KABOOM", pre + " " + body);
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
                        debug: suiteTest.debug,
                      },
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
