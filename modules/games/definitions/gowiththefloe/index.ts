// File generated by 'npm run export'

import { GowiththefloeDefinition } from "./_types";

import gowiththefloeAI from "./ai";
import gowiththefloeAnim from "./anim";
import gowiththefloeBoard from "./board";
import gowiththefloeSetupBook from "./setups";
import gowiththefloeGraphics from "./graphics";
import gowiththefloeInstruction from "./instructions";
import gowiththefloeMeta from "./meta";
import gowiththefloePerformance from "./performance";
import gowiththefloeFlow from "./flow";
import gowiththefloeScripts from "./scripts";
import gowiththefloeGenerators from "./generators";

const gowiththefloeDefinition: GowiththefloeDefinition = {
  AI: gowiththefloeAI,
  anim: gowiththefloeAnim,
  board: gowiththefloeBoard,
  setups: gowiththefloeSetupBook,
  graphics: gowiththefloeGraphics,
  instructions: gowiththefloeInstruction,
  generators: gowiththefloeGenerators,
  meta: gowiththefloeMeta,
  performance: gowiththefloePerformance,
  flow: gowiththefloeFlow,
  scripts: gowiththefloeScripts,
};

export default gowiththefloeDefinition;

export * from "./_types";
