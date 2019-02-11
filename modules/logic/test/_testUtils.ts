import {
  FileMatcher,
  FindOptions,
  AttributeType,
  PredicateOperator
} from "file-matcher";
import * as path from "path";

const options: FindOptions = {
  path: path.join(__dirname, "../def2code"),
  recursiveSearch: true,
  fileFilter: { fileNamePattern: "**/*.suite.ts" }
};

const matcher = new FileMatcher();

export async function getSuites() {
  let suiteFiles;
  try {
    suiteFiles = await matcher.find(options);
  } catch (e) {
    console.log("Suite search failed!", e);
    throw e;
  }
  return suiteFiles;
}
