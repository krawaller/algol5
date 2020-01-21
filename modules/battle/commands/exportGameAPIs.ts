import { exportGameAPI } from "./helpers/exportGameAPI";
import names, { GameId } from "./helpers/_names";
import * as fs from "fs-extra";
import * as path from "path";

const gameId = <GameId>process.argv[2];

(async () => {
  if (!gameId) {
    console.log("---- Exporting API for all games ----");
    await Promise.all(names.map(exportGameAPI));
    await fs.writeFile(
      path.join(__dirname, "../dist", "allStaticAPIs.tsx"),
      `// Generated by "npm run exportGameAPIs"
${names.map(id => `import ${id} from './apis/${id}/static';\n`).join("")}
export const staticAPIs = {  ${names.map(id => `${id}`).join(", ")} };
export default staticAPIs;
`
    );
    await fs.writeFile(
      path.join(__dirname, "../dist", "allStatefulAPIs.tsx"),
      `// Generated by "npm run exportGameAPIs"
${names.map(id => `import ${id} from './apis/${id}/stateful';\n`).join("")}
export const statefulAPIs = {  ${names.map(id => `${id}`).join(", ")} };
export default statefulAPIs;
`
    );
    console.log("---- All games got APIs! ----");
  } else if (names.indexOf(gameId) === -1) {
    console.log(`Game "${gameId}" doesn't exists!`);
  } else {
    exportGameAPI(gameId).catch(e => console.log("API export failed", e));
  }
})();
