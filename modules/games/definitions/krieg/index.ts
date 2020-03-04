// File generated by 'npm run export'

import { KriegDefinition } from "./_types";

import kriegAI from "./ai";
import kriegAnim from "./anim";
import kriegBoardBook from "./boards";
import kriegSetupBook from "./setup";
import kriegGraphics from "./graphics";
import kriegInstruction from "./instructions";
import kriegMeta from "./meta";
import kriegPerformance from "./performance";
import kriegFlow from "./flow";
import kriegScripts from "./scripts";
import kriegGenerators from "./generators";
import kriegVariantsBook from "./variants";

const kriegDefinition: KriegDefinition = {
  AI: kriegAI,
  anim: kriegAnim,
  boards: kriegBoardBook,
  setups: kriegSetupBook,
  graphics: kriegGraphics,
  instructions: kriegInstruction,
  generators: kriegGenerators,
  meta: kriegMeta,
  performance: kriegPerformance,
  flow: kriegFlow,
  scripts: kriegScripts,
  variants: kriegVariantsBook,
};

export default kriegDefinition;

export * from "./_types";
