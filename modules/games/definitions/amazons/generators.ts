import { AmazonsGenerators } from './_types';

const amazonsGenerators: AmazonsGenerators = {
  findmovetargets: {
    type: "walker",
    dirs: "rose",
    start: "selectunit",
    blocks: "units",
    draw: { steps: { tolayer: "movetargets" } }
  },
  findfiretargets: {
    type: "walker",
    dirs: "rose",
    start: "selectmovetarget",
    blocks: "units",
    draw: { start: { tolayer: "firedfrom" }, steps: { tolayer: "firetargets" } }
  }
};

export default amazonsGenerators;
