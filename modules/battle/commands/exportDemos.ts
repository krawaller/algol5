import names from "./helpers/_names";
import * as fs from "fs-extra";
import * as path from "path";

(async () => {
  await fs.writeFile(
    path.join(__dirname, "../dist", "allDemos.ts"),
    `${names.map(id => `import { ${id}Demo } from './demos/${id}';\n`).join("")}
  export default { ${names.map(n => `${n}: ${n}Demo`).join(", ")} };`
  );
  console.log("Updated file exporting all demos");
})();
