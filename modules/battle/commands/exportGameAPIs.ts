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
      path.join(__dirname, "../dist", "allAPIs.tsx"),
      `${names
        .map(
          id =>
            `import ${id}, { staticAPI as ${id}Static } from './apis/${id}';\n`
        )
        .join("")}
export const staticAPIs = {  ${names
        .map(id => `${id}: ${id}Static`)
        .join(", ")} };
export const statefulAPIs = { ${names.join(", ")} };
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
