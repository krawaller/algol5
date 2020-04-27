import { ScatterDefinition } from "./_types";

const scatterPerformance: ScatterDefinition["performance"] = {
  canAlwaysEnd: {
    east: true,
    west: true,
    north: true,
    south: true,
    selectmovetarget: true,
    move: true,
  },
  massiveTree: {},
  noEndGameCheck: ["east", "west", "south", "north"],
};

export default scatterPerformance;
