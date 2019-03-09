import { findSuites } from "../test/findSuites";
import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../dist");

findSuites().then(async suites => {
  await fs.ensureDir(out);

  const moduleRoot = path.join(__dirname, "..");
  const paths = suites.map(s =>
    s.replace(moduleRoot, "..").replace(/\.ts$/, "")
  );

  let file = `import { AlgolWriterSuite } from "../../types";\n\n`;

  file += paths
    .map((p, n) => `import { testSuite as testSuite${n + 1} } from "${p}";`)
    .join("\n");

  file += `

const suites: AlgolWriterSuite<any>[] = [
  ${paths.map((p, n) => `testSuite${n + 1}`).join(",\n  ")}
];

export default suites;
`;

  await fs.writeFile(path.join(out, "suites.ts"), file);
  console.log("Updates dist/suite.ts with all suites found in module");
});
