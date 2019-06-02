import * as fs from "fs-extra";
import * as path from "path";

import templateAnalysis from "./templates/analysis";

import { defPath } from "./_paths";

export default async function fake(gameId: string) {
  await fs.writeFile(
    path.join(defPath, gameId, "_types.ts"),
    templateAnalysis(gameId)
  );
  console.log("Types for", gameId, "faked");
}
