import { TrafficlightsDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const trafficlightsBoardBook: TrafficlightsDefinition["boards"] = {
  basic: { width: 4, height: 3, terrain: {} }
};

export default trafficlightsBoardBook;
