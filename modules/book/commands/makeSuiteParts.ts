import suites from "../../logic/dist/suites";

import { TestSuite } from "../../types";
import { emptyFullDef, truthy, falsy } from "../../common";

import * as fs from "fs-extra";
import * as path from "path";
import * as prettier from "prettier";

const out = path.join(__dirname, "../parts/suites");

fs.ensureDir(out).then(async () => {
  await Promise.all(
    suites.map(suite => {
      const content = printSuite(suite);
      const filePath = path.join(out, `${suite.title.toLowerCase()}.md`);
      return fs.writeFile(filePath, content);
    })
  );
  console.log("All suite parts written");
});

export function printSuite(suite: TestSuite<any>) {
  const nbrDefs = suite.defs.length;
  const funcName = suite.func.funcName || suite.func.name;
  let ret = `
# ${suite.title}

This suite uses the \`${funcName}\` function. It contains ${
    nbrDefs > 1 ? `${nbrDefs} signatures` : "a single signature"
  }:\n\n`;

  suite.defs.forEach((def, nSig) => {
    ret += `## Signature ${nSig + 1}\n\n`;

    if (def.def === emptyFullDef) {
      ret += `This signature uses the **empty game definition**. `;
    } else {
      ret += `This signature uses the following game definition:

\`\`\`typescript
${format(JSON.stringify(def.def), true)}
\`\`\`\n\n`;
    }

    ret += `The \`player\` is ${def.player} and \`action\` is ${
      def.action
    }.\n\n`;

    const nbrOfCtx = def.contexts.length;
    ret += `For this signature we have ${
      nbrOfCtx > 1 ? `${nbrOfCtx} contexts` : "a single context"
    }:\n\n`;

    def.contexts.forEach((ctx, nCtx) => {
      ret += `### Context ${nSig + 1}-${nCtx + 1}\n\n`;
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
        nbrOfTests > 1 ? `${nbrOfTests} tests` : "a single test"
      }:\n\n`;

      ctx.tests.forEach((test, nTest) => {
        ret += `#### Test ${nSig + 1}-${nCtx + 1}-${nTest + 1}\n\n`;
        const expressionCode = format(JSON.stringify(test.expr), true);
        const resultingCode = format(
          suite.func(def.def, def.player, def.action, test.expr),
          !test.sample
        );
        const codeEqualsRes =
          resultingCode === format(JSON.stringify(test.res), true);
        const truthyFalsy = test.res === truthy || test.res === falsy;
        if (test.desc) {
          ret += `This test demonstrates that: ${test.desc}\n\n`;
        }
        ret += `When running \`${funcName}\` with the following input...

\`\`\`typescript
${expressionCode}
\`\`\`

...we get this code:

\`\`\`typescript
${resultingCode}
\`\`\`\n\n`;
        if (test.sample && truthyFalsy) {
          ret += `After executing that code in the current context, the following expression is ${
            test.res === truthy ? "truthy" : "falsy"
          }:

\`\`\`typescript
${format(test.sample, true)}
\`\`\`\n\n`;
        } else if (test.sample) {
          ret += `If we run that in the current context, then this expression...

\`\`\`typescript
${format(test.sample, true)}
\`\`\`\n\n`;
          ret += showEval("...would evaluate to", test.res);
        } else if (!codeEqualsRes && truthyFalsy) {
          ret += `When evaluated in the current context, that expression is ${
            test.res === truthy ? "truthy" : "falsy"
          }.\n\n`;
        } else if (!codeEqualsRes) {
          ret += showEval("In the current context that evaluates to", test.res);
        }
      });
    });
  });
  return ret;
}

function format(input, isExpression) {
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
