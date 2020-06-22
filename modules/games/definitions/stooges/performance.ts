import { StoogesDefinition } from "./_types";

const stoogesPerformance: StoogesDefinition["performance"] = {
  canAlwaysEnd: {
    selectmovetarget: true,
    selectsingle: true,
  },
  massiveTree: {},
  noEndGameCheck: ["swap"],
};

export default stoogesPerformance;
