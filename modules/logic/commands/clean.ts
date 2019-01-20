import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname + "/generated");

fs.removeSync(out);

console.log("Output directory cleaned");
