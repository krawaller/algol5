import { JesonmorDefinition } from "./_types";

const jesonmorVariants: JesonmorDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        horses: {
          "1": [{ holerect: ["a1", "i1", "c1"] }, "d3"],
          "2": [{ rect: ["a9", "i9"] }],
        },
      },
      marks: ["f9"],
      potentialMarks: ["d8", "e7", "g7", "h8"],
    },
  },
];

export default jesonmorVariants;
