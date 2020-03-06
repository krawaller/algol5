import { GogolDefinition } from "./_types";

const gogolPerformance: GogolDefinition["performance"] = {
  canAlwaysEnd: {
    selectmovetarget: true,
    selectkingdeploy: true,
    selectjumptarget: true
  },
  massiveTree: {},
  noEndGameCheck: ["deploy"]
};

export default gogolPerformance;
