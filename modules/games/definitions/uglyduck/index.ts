// File generated by 'npm run export'

import { UglyduckDefinition } from "./_types";

import uglyduckAI from "./ai";
import uglyduckAnim from "./anim";
import uglyduckBoardBook from "./boards";
import uglyduckSetupBook from "./setups";
import uglyduckGraphics from "./graphics";
import uglyduckInstruction from "./instructions";
import uglyduckMeta from "./meta";
import uglyduckPerformance from "./performance";
import uglyduckFlow from "./flow";
import uglyduckScripts from "./scripts";
import uglyduckGenerators from "./generators";

const uglyduckDefinition: UglyduckDefinition = {
  AI: uglyduckAI,
  anim: uglyduckAnim,
  boards: uglyduckBoardBook,
  setups: uglyduckSetupBook,
  graphics: uglyduckGraphics,
  instructions: uglyduckInstruction,
  generators: uglyduckGenerators,
  meta: uglyduckMeta,
  performance: uglyduckPerformance,
  flow: uglyduckFlow,
  scripts: uglyduckScripts,
};

export default uglyduckDefinition;

export * from "./_types";
