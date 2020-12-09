import * as fs from "fs-extra";
import * as path from "path";
import { findSuites } from "./findSuites";

const out = path.join(__dirname, "generatedSuiteTests");

async function setup() {
  console.log(" -------- Generating test files for suites --------");
  await fs.remove(out);
  await fs.mkdir(out);
  const suites = await findSuites();
  await Promise.all(
    suites.map(async p => {
      const name = p.split("/")[p.split("/").length - 1].replace(/\.ts$/, "");
      await fs.writeFile(
        path.join(out, name + ".test.ts"),
        `import { testSuite } from '${path
          .relative(out, p)
          .replace(/\.ts$/, "")}';
import { runSuite } from '../runSuite';

runSuite(testSuite);
`
      );
      console.log("Generating test file for", name);
    })
  );
  console.log(` ------- ${suites.length} files set up! --------`);
}

setup();
