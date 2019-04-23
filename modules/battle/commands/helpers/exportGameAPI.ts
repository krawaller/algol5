import { GameId } from "./_names";
import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../../dist/apis");

export async function exportGameAPI(gameId: GameId) {
  await fs.ensureDir(out);
  await fs.writeFile(
    path.join(out, gameId + ".ts"),
    `
import ${gameId} from "../../../logic/dist/indiv/${gameId}";
import { makeGameAPI } from "../../src";

const ${gameId}API = makeGameAPI(${gameId});

export default ${gameId}API;
`
  );
  console.log("Exporting api for", gameId);
}
