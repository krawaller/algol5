// File generated by 'npm run export'

import { TrafficlightsDefinition } from "./_types";

import trafficlightsAI from "./ai";
import trafficlightsAnim from "./anim";
import trafficlightsBoardBook from "./boards";
import trafficlightsSetupBook from "./setups";
import trafficlightsGraphics from "./graphics";
import trafficlightsInstruction from "./instructions";
import trafficlightsMeta from "./meta";
import trafficlightsPerformance from "./performance";
import trafficlightsFlow from "./flow";
import trafficlightsScripts from "./scripts";
import trafficlightsGenerators from "./generators";
import trafficlightsVariantsBook from "./variants";

const trafficlightsDefinition: TrafficlightsDefinition = {
  AI: trafficlightsAI,
  anim: trafficlightsAnim,
  boards: trafficlightsBoardBook,
  setups: trafficlightsSetupBook,
  graphics: trafficlightsGraphics,
  instructions: trafficlightsInstruction,
  generators: trafficlightsGenerators,
  meta: trafficlightsMeta,
  performance: trafficlightsPerformance,
  flow: trafficlightsFlow,
  scripts: trafficlightsScripts,
  variants: trafficlightsVariantsBook,
};

export default trafficlightsDefinition;

export * from "./_types";
