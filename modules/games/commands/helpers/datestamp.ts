import * as fs from "fs-extra";
import * as path from "path";

import { distPath } from "./_paths";

const target = path.join(distPath, "datestamp.ts");

export default function dateStamp() {
  return fs.writeFile(target, `export default "${new Date()}";`);
}
