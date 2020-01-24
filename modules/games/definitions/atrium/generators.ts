import { AtriumGenerators } from "./_types";

const atriumGenerators: AtriumGenerators = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: "ortho",
    unlessover: "units",
    draw: { neighbours: { tolayer: "movetargets" } }
  },
  findwinlines: {
    type: "walker",
    starts: "myunits",
    startasstep: true,
    dirs: "rose",
    steps: {
      ifelse: [{ anyat: ["mykings", ["start"]] }, "mykings", "myqueens"]
    },
    draw: {
      steps: { condition: { same: [["walklength"], 3] }, tolayer: "winline" }
    }
  }
};

export default atriumGenerators;
