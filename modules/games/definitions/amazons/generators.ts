import { AmazonsGenerators } from "./_types";

const amazonsGenerators: AmazonsGenerators = {
  findtargets: {
    type: "walker",
    dirs: ["rose"],
    start: {
      ifactionelse: ["selectunit", "selectunit", "selectmovetarget"]
    },
    blocks: "units",
    draw: { steps: { tolayer: "targets" } }
  }
};

export default amazonsGenerators;
