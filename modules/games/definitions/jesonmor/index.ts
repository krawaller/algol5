// File generated by 'npm run export'

import { JesonmorDefinition } from "./_types";

import jesonmorAI from "./ai";
import jesonmorAnim from "./anim";
import jesonmorBoardBook from "./boards";
import jesonmorSetupBook from "./setups";
import jesonmorGraphics from "./graphics";
import jesonmorInstruction from "./instructions";
import jesonmorMeta from "./meta";
import jesonmorPerformance from "./performance";
import jesonmorFlow from "./flow";
import jesonmorScripts from "./scripts";
import jesonmorGenerators from "./generators";
import jesonmorVariants from "./variants";

const jesonmorDefinition: JesonmorDefinition = {
  AI: jesonmorAI,
  anim: jesonmorAnim,
  boards: jesonmorBoardBook,
  setups: jesonmorSetupBook,
  graphics: jesonmorGraphics,
  instructions: jesonmorInstruction,
  generators: jesonmorGenerators,
  meta: jesonmorMeta,
  performance: jesonmorPerformance,
  flow: jesonmorFlow,
  scripts: jesonmorScripts,
  variants: jesonmorVariants
};

export default jesonmorDefinition;

export * from "./_types";