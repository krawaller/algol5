import { defPath } from "./_paths";

import * as fs from "fs-extra";

// list by reading the folder instead of importing the lib, since we want to
// be able to get names even when typescript doesn't compile

export default async function list() {
  const paths = await fs.readdir(defPath);
  return paths.filter(p => p !== ".DS_Store");
}
