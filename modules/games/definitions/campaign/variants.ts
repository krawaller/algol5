import { CampaignDefinition } from "./_types";

const campaignVariants: CampaignDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
    arr: {
      setup: {
        knights: {
          1: ["d5"],
          2: ["e4"],
        },
        marks: {
          1: ["d4", "e6", "f4", "f5"],
          2: ["c5", "d3", "d6"],
        },
      },
      marks: ["e4"],
      potentialMarks: ["f6", "g5", "g3", "f2", "d2", "c3"],
    },
  },
];

export default campaignVariants;
