import { makeDemo } from "./helpers/makeDemo";
import names, { GameId } from "./helpers/_names";
import * as fs from "fs-extra";
import * as path from "path";
const gameId = ((<string>process.argv[2]) as unknown) as GameId;

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
    makeDemo((gameId as unknown) as GameId).catch(e =>
      console.log("Compilation failed", e)
    );
  }
})();
