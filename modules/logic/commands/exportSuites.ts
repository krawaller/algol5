import { findSuites } from "../test/findSuites";
import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../dist");

findSuites().then(async suites => {
  await fs.ensureDir(out);

  let file = `import { AlgolSuite } from "algol-types";\n\n`;

  file += suites
    .map(
      (p, n) =>
        `import { testSuite as testSuite${n + 1} } from "${path
          .relative(out, p)
          .replace(/\.ts$/, "")}";`
    )
    .join("\n");

  file += `

const suites: AlgolSuite[] = [
  ${suites.map((p, n) => `testSuite${n + 1}`).join(",\n  ")}
];

export default suites;
`;

  await fs.writeFile(path.join(out, "suites.ts"), file);
  console.log("Updates dist/suite.ts with all suites found in module");
});
