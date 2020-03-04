import * as fs from "fs-extra";
import * as path from "path";
import prettier from "prettier";

import templateAI from "./templates/ai";
import templateAnalysis from "./templates/analysis";
import templateAnim from "./templates/anim";
import templateBoard from "./templates/boards";
import templateGraphics from "./templates/graphics";
import templateInstructions from "./templates/instructions";
import templateMeta from "./templates/meta";
import templatePerformance from "./templates/performance";
import templateFlow from "./templates/flow";
import templateGenerators from "./templates/generators";
import templateScripts from "./templates/scripts";
import templateSetup from "./templates/setups";
import templateIndex from "./templates/index";

import { defPath } from "./_paths";

export default async function stub(gameId: string) {
  await fs.ensureDir(path.join(defPath, gameId));
  await Promise.all([
    template(gameId, templateAI, "ai"),
    template(gameId, templateAnim, "anim"),
    template(gameId, templateAnalysis, "_types"),
    template(gameId, templateBoard, "board"),
    template(gameId, templateFlow, "flow"),
    template(gameId, templateGenerators, "generators"),
    template(gameId, templateGraphics, "graphics"),
    template(gameId, templateInstructions, "instructions"),
    template(gameId, templateMeta, "meta"),
    template(gameId, templatePerformance, "performance"),
    template(gameId, templateScripts, "scripts"),
    template(gameId, templateSetup, "setups"),
    template(gameId, templateIndex, "index"),
  ]);
  return console.log("Stubbed", gameId);
}

function template(
  gameId: string,
  template: (gameId: string) => string,
  name: string
) {
  return fs.writeFile(
    path.join(defPath, gameId, name + ".ts"),
    prettier.format(template(gameId), { filepath: "foo.ts" })
  );
}
