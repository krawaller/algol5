import { makeDemo } from "./helpers/makeDemo";
import names, { GameId } from "./helpers/_names";
import * as fs from "fs-extra";
import * as path from "path";
const gameId = <GameId>process.argv[2];

(async () => {
  if (!gameId) {
    console.log("---- Making demo for all games ----");
    await Promise.all(names.map(makeDemo)).then(() =>
      console.log("---- All games got demos! ----")
    );
    await fs.writeFile(
      path.join(__dirname, "../dist", "allDemos.ts"),
      `${names
        .map(id => `import { ${id}Demo } from './demos/${id}';\n`)
        .join("")}
  export default { ${names.map(n => `${n}: ${n}Demo`).join(", ")} };`
    );
  } else if (names.indexOf(gameId) === -1) {
    console.log(`Game "${gameId}" doesn't exists!`);
  } else {
    makeDemo(gameId).catch(e => console.log("Compilation failed", e));
  }
})();
