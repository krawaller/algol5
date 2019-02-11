import { getSuites } from "../test/_testUtils";
import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../dist");

getSuites().then(async suites => {
  await fs.ensureDir(out);

  const moduleRoot = path.join(__dirname, "..");
  const paths = suites.map(s =>
    s.replace(moduleRoot, "..").replace(/\.ts$/, "")
  );

  let file = `import {TestSuite} from '../../types';\n\n`;

  file += paths
    .map((p, n) => `import {testSuite as testSuite${n + 1}} from '${p}';`)
    .join("\n");

  file += `

const suites: TestSuite<any>[] = [
  ${paths.map((p, n) => `testSuite${n + 1}`).join(",\n  ")}
];

export default suites;
`;

  await fs.writeFile(path.join(out, "suites.ts"), file);
  console.log("Updates dist/suite.ts with all suites found in module");
});
