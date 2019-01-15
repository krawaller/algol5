import { AmazonsGenerators } from "./_types";

const amazonsGenerators: AmazonsGenerators = {
  findtargets: {
    type: "walker",
    dirs: [1, 2, 3, 4, 5, 6, 7, 8],
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
