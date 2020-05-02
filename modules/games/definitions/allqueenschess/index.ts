// File generated by 'npm run export'

import { AllqueenschessDefinition } from "./_types";

import allqueenschessAI from "./ai";
import allqueenschessAnim from "./anim";
import allqueenschessBoardBook from "./boards";
import allqueenschessSetupBook from "./setups";
import allqueenschessGraphics from "./graphics";
import allqueenschessInstruction from "./instructions";
import allqueenschessMeta from "./meta";
import allqueenschessPerformance from "./performance";
import allqueenschessFlow from "./flow";
import allqueenschessScripts from "./scripts";
import allqueenschessGenerators from "./generators";
import allqueenschessVariants from "./variants";

const allqueenschessDefinition: AllqueenschessDefinition = {
  AI: allqueenschessAI,
  anim: allqueenschessAnim,
  boards: allqueenschessBoardBook,
  setups: allqueenschessSetupBook,
  graphics: allqueenschessGraphics,
  instructions: allqueenschessInstruction,
  generators: allqueenschessGenerators,
  meta: allqueenschessMeta,
  performance: allqueenschessPerformance,
  flow: allqueenschessFlow,
  scripts: allqueenschessScripts,
  variants: allqueenschessVariants
};

export default allqueenschessDefinition;

export * from "./_types";
