import * as fs from "fs-extra";
import * as path from "path";

const target = path.join(__dirname, '../../dist/datestamp.ts');

export default function dateStamp() {
  return fs.writeFile(target, `export default "${new Date()}";`);
}
