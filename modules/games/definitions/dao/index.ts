// File generated by 'npm run export'

import { DaoDefinition } from "./_types";

import daoAI from "./ai";
import daoAnim from "./anim";
import daoBoardBook from "./boards";
import daoSetupBook from "./setups";
import daoGraphics from "./graphics";
import daoInstruction from "./instructions";
import daoMeta from "./meta";
import daoPerformance from "./performance";
import daoFlow from "./flow";
import daoScripts from "./scripts";
import daoGenerators from "./generators";
import daoVariants from "./variants";

const daoDefinition: DaoDefinition = {
  AI: daoAI,
  anim: daoAnim,
  boards: daoBoardBook,
  setups: daoSetupBook,
  graphics: daoGraphics,
  instructions: daoInstruction,
  generators: daoGenerators,
  meta: daoMeta,
  performance: daoPerformance,
  flow: daoFlow,
  scripts: daoScripts,
  variants: daoVariants
};

export default daoDefinition;

export * from "./_types";