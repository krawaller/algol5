// File generated by 'npm run export'

import { OutwitDefinition } from "./_types";

import outwitAI from "./ai";
import outwitAnim from "./anim";
import outwitBoardBook from "./boards";
import outwitSetupBook from "./setups";
import outwitGraphics from "./graphics";
import outwitInstruction from "./instructions";
import outwitMeta from "./meta";
import outwitPerformance from "./performance";
import outwitFlow from "./flow";
import outwitScripts from "./scripts";
import outwitGenerators from "./generators";
import outwitVariants from "./variants";

const outwitDefinition: OutwitDefinition = {
  AI: outwitAI,
  anim: outwitAnim,
  boards: outwitBoardBook,
  setups: outwitSetupBook,
  graphics: outwitGraphics,
  instructions: outwitInstruction,
  generators: outwitGenerators,
  meta: outwitMeta,
  performance: outwitPerformance,
  flow: outwitFlow,
  scripts: outwitScripts,
  variants: outwitVariants
};

export default outwitDefinition;

export * from "./_types";