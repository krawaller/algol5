import * as path from "path";

import * as glob from "glob";

export async function findSuites() {
  let suiteFiles: string[] = [];
  try {
    suiteFiles = await new Promise((resolve, reject) => {
      glob(
        "**/*.suite.ts",
        {
          root: path.join(__dirname, "../def2code")
        },
        (err, res) => (err ? reject(err) : resolve(res))
      );
    });
  } catch (e) {
    console.log("Suite search failed!", e);
    throw e;
  }
  return suiteFiles;
}
