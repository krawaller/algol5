import suites from "../../logic/dist/suites";

import { AlgolSuite, isAlgolExpressionTest } from "../../types";
import { emptyFullDef, truthy, falsy } from "../../common";

import * as fs from "fs-extra";
import * as path from "path";
import * as prettier from "prettier";

const out = path.join(__dirname, "../parts/suites");

fs.ensureDir(out).then(async () => {
  console.log(" --------- Printing", suites.length, "suites");
  await Promise.all(
    suites.map(async suite => {
      const content = printSuite(suite);
      const filePath = path.join(out, `${suite.title.toLowerCase()}.md`);
      await fs.writeFile(filePath, content);
      console.log("Printed", suite.title);
    })
  );
  console.log(" -------- All suite parts written");
});

export function printSuite(suite: AlgolSuite) {
  const nbrDefs = suite.defs.length;
  const funcName = suite.func.funcName || suite.func.name;
  let ret = `
# ${suite.title}

This suite uses the \`${funcName}\` function. It contains ${
    nbrDefs > 1 ? `${nbrDefs} signatures` : "a single signature"
  }:\n\n`;

  for (const nSig in suite.defs) {
    const def = suite.defs[nSig];
    ret += `## Signature ${+nSig + 1}\n\n`;

    if (def.def === emptyFullDef) {
      ret += `This signature uses the **empty game definition**. `;
    } else {
      ret += `This signature uses the following game definition:

\`\`\`typescript
${format(defDiff(def.def, emptyFullDef), true)}
\`\`\`\n\n`;
    }

    ret += `The \`player\` is ${def.player} and \`action\` is ${
      def.action
    }.\n\n`;

    const nbrOfCtx = def.contexts.length;
    ret += `For this signature we have ${
      nbrOfCtx > 1 ? `${nbrOfCtx} contexts` : "a single context"
    }:\n\n`;

    for (const nCtx in def.contexts) {
      const ctx = def.contexts[nCtx];
      ret += `### Context ${+nSig + 1}-${+nCtx + 1}\n\n`;
      if (JSON.stringify(ctx.context) === "{}") {
        ret += "This context is **empty**.\n\n";
      } else {
        ret += `This context contains:

\`\`\`typescript
${format(JSON.stringify(ctx.context), true)}
\`\`\`\n\n`;
      }

      const nbrOfTests = ctx.tests.length;
      ret += `For this context we have ${
        nbrOfTests > 1 ? `${nbrOfTests} inputs` : "a single input"
      }:\n\n`;

      for (const nTest in ctx.tests) {
        const suiteTest = ctx.tests[nTest];
        const isExpression = isAlgolExpressionTest(suiteTest);

        ret += `#### Input ${+nSig + 1}-${+nCtx + 1}-${+nTest + 1}\n\n`;
        const inputCode = format(JSON.stringify(suiteTest.expr), true);
        const resultingCode = format(
          suite.func(def.def, def.player, def.action, suiteTest.expr),
          isExpression
        );
        if (suiteTest.desc) {
          ret += `This test demonstrates that: ${suiteTest.desc}\n\n`;
        }
        ret += `When running \`${funcName}\` with the following input...

\`\`\`typescript
${inputCode}
\`\`\`\n\n`;

        if (resultingCode) {
          ret += `...we get this code:

\`\`\`typescript
${resultingCode}
\`\`\`\n\n`;

          if (isAlgolExpressionTest(suiteTest)) {
            const codeEqualsRes =
              resultingCode === format(JSON.stringify(suiteTest.res), true);
            const truthyFalsy =
              suiteTest.res === truthy || suiteTest.res === falsy;

            if (!codeEqualsRes && truthyFalsy) {
              ret += `When evaluated in the current context, that expression is ${
                suiteTest.res === truthy ? "truthy" : "falsy"
              }.\n\n`;
            } else if (!codeEqualsRes) {
              ret += showEval(
                "In the current context that evaluates to",
                suiteTest.res
              );
            }
          } else {
            for (const nAssert in suiteTest.asserts) {
              const assert = suiteTest.asserts[nAssert];

              const codeEqualsRes =
                resultingCode === format(JSON.stringify(assert.res), true);
              const truthyFalsy = assert.res === truthy || assert.res === falsy;

              if (assert.sample && truthyFalsy) {
                const lead = +nAssert
                  ? "Also,"
                  : "After executing that code in the current context,";
                ret += `${lead} the following expression is ${
                  assert.res === truthy ? "truthy" : "falsy"
                }:

\`\`\`typescript
${format(assert.sample, true)}
\`\`\`\n\n`;
              } else {
                const lead = +nAssert
                  ? "Also,"
                  : "If we run that in the current context, then";
                ret += `${lead} this expression...

\`\`\`typescript
${format(assert.sample, true)}
\`\`\`\n\n`;
                ret += showEval("...would evaluate to", assert.res);
              }
            }
          }
        } else {
          ret += `...we get no code output at all! This is a noop.\n\n`;
        }
      }
    }
  }
  return ret;
}

function format(input, isExpression) {
  try {
    if (isExpression) {
      return prettier
        .format("let e = " + input, {
          parser: "typescript"
        })
        .slice(8, -2);
    } else {
      return prettier.format(input, {
        parser: "typescript"
      });
    }
  } catch (e) {
    console.log("BOOM", input, isExpression);
    throw e;
  }
}

function showEval(sentence, res) {
  if (typeof res === "number") {
    return `${sentence} \`${res}\`.\n\n`;
  } else if (typeof res === "string") {
    return `${sentence} \`"${res}"\`.\n\n`;
  } else {
    return `${sentence}...

\`\`\`typescript
${format(JSON.stringify(res), true)}
\`\`\`\n\n`;
  }
}

const indent = n => "".padStart(n * 2, " ");

function defDiff(obj, compTo = {}, path = "emptyFullDef", lvl = 0) {
  if (typeof obj !== "object") return obj;
  let ret = "";
  ret += `{\n`;
  const objKeys = Object.keys(obj);
  const diffKeys = objKeys.filter(
    key => typeof obj[key] !== "object" || obj[key] !== compTo[key]
  );
  if (diffKeys.length !== objKeys.length)
    ret += `${indent(lvl + 1)}...${path},\n`;
  ret += diffKeys
    .map(
      key =>
        `${indent(lvl + 1)}${key}: ` +
        defDiff(obj[key], compTo[key], `${path}.${key}`, lvl + 1)
    )
    .join(",\n");
  ret += `${indent(lvl)}}`;
  return ret;
}
