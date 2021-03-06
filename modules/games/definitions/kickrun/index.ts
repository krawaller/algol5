// File generated by 'npm run export'

import { KickrunDefinition } from "./_types";

import kickrunAI from "./ai";
import kickrunAnim from "./anim";
import kickrunBoardBook from "./boards";
import kickrunSetupBook from "./setups";
import kickrunGraphics from "./graphics";
import kickrunInstruction from "./instructions";
import kickrunMeta from "./meta";
import kickrunPerformance from "./performance";
import kickrunFlow from "./flow";
import kickrunScripts from "./scripts";
import kickrunGenerators from "./generators";
import kickrunVariantsBook from "./variants";

const kickrunDefinition: KickrunDefinition = {
  AI: kickrunAI,
  anim: kickrunAnim,
  boards: kickrunBoardBook,
  setups: kickrunSetupBook,
  graphics: kickrunGraphics,
  instructions: kickrunInstruction,
  generators: kickrunGenerators,
  meta: kickrunMeta,
  performance: kickrunPerformance,
  flow: kickrunFlow,
  scripts: kickrunScripts,
  variants: kickrunVariantsBook
};

export default kickrunDefinition;

export * from "./_types";
