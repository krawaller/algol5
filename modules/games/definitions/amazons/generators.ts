import { AmazonsGenerators } from "./_types";

const amazonsGenerators: AmazonsGenerators = {
  findtargets: {
    type: "walker",
    dirs: ["rose"],
    start: {
      ifactionelse: ["selectunit", "selectunit", { turnpos: "movedto" }]
    },
    blocks: "units",
    draw: {
      steps: {
        tolayer: "targets"
      }
    }
  }
};

export default amazonsGenerators;
