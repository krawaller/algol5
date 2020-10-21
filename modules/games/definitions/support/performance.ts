import { SupportDefinition } from "./_types";

const supportPerformance: SupportDefinition["performance"] = {
  canAlwaysEnd: {
    move: true,
    insert: true,
  },
  massiveTree: {},
  noEndGameCheck: [],
};

export default supportPerformance;
