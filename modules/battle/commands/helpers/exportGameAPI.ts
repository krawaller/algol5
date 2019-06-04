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
import { makeStatefulGameAPI, makeStaticGameAPI } from "../../src";

export const statefulAPI = makeStatefulGameAPI(${gameId});
export const staticAPI = makeStaticGameAPI(${gameId});

export default statefulAPI;
`
  );
  console.log("Exporting api:s for", gameId);
}
