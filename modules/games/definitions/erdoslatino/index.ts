// File generated by 'npm run export'

import { ErdoslatinoDefinition } from "./_types";

import erdoslatinoAI from "./ai";
import erdoslatinoAnim from "./anim";
import erdoslatinoBoardBook from "./boards";
import erdoslatinoSetupBook from "./setups";
import erdoslatinoGraphics from "./graphics";
import erdoslatinoInstruction from "./instructions";
import erdoslatinoMeta from "./meta";
import erdoslatinoPerformance from "./performance";
import erdoslatinoFlow from "./flow";
import erdoslatinoScripts from "./scripts";
import erdoslatinoGenerators from "./generators";
import erdoslatinoVariants from "./variants";

const erdoslatinoDefinition: ErdoslatinoDefinition = {
  AI: erdoslatinoAI,
  anim: erdoslatinoAnim,
  boards: erdoslatinoBoardBook,
  setups: erdoslatinoSetupBook,
  graphics: erdoslatinoGraphics,
  instructions: erdoslatinoInstruction,
  generators: erdoslatinoGenerators,
  meta: erdoslatinoMeta,
  performance: erdoslatinoPerformance,
  flow: erdoslatinoFlow,
  scripts: erdoslatinoScripts,
  variants: erdoslatinoVariants
};

export default erdoslatinoDefinition;

export * from "./_types";