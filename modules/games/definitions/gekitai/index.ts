// File generated by 'npm run export'

import { GekitaiDefinition } from "./_types";

import gekitaiAI from "./ai";
import gekitaiAnim from "./anim";
import gekitaiBoard from "./board";
import gekitaiSetup from "./setup";
import gekitaiGraphics from "./graphics";
import gekitaiInstruction from "./instructions";
import gekitaiMeta from "./meta";
import gekitaiPerformance from "./performance";
import gekitaiFlow from "./flow";
import gekitaiScripts from "./scripts";
import gekitaiGenerators from "./generators";

const gekitaiDefinition: GekitaiDefinition = {
  AI: gekitaiAI,
  anim: gekitaiAnim,
  board: gekitaiBoard,
  setup: gekitaiSetup,
  graphics: gekitaiGraphics,
  instructions: gekitaiInstruction,
  generators: gekitaiGenerators,
  meta: gekitaiMeta,
  performance: gekitaiPerformance,
  flow: gekitaiFlow,
  scripts: gekitaiScripts
};

export default gekitaiDefinition;

export * from "./_types";
