import { makeSVG } from "./helpers";
import list from "../../games/dist/list";
import * as fs from "fs-extra";
import * as path from "path";

const gameId = process.argv[2];

(async () => {
  if (!gameId) {
    console.log("---- Generating SVG board for all games ----");
    await Promise.all(list.map(makeSVG));
    await fs.writeFile(
      path.join(__dirname, "../dist/svgDataURIs.ts"),
      `import {GameId} from "../../games/dist/list";\n` +
        list
          .map(id => `import ${id} from './svgDataURIs/${id}.json'\n`)
          .join("") +
        `const data: { [key in GameId]: { height: number, width: number, dataURI: string } } = { ${list.join(
          ", "
        )} };\nexport default data;\n`
    );
    console.log("---- All games got SVG board ----");
  } else if (list.indexOf(gameId) === -1) {
    console.log(`Game "${gameId}" doesn't exists!`);
  } else {
    makeSVG(gameId);
  }
})();
