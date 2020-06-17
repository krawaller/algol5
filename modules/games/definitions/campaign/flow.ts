import { CampaignDefinition } from "./_types";

const campaignFlow: CampaignDefinition["flow"] = {
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
  },
  startTurn: {
    runGenerator: "findjumptargets",
    link: {
      ifelse: [["isFirstTurn"], "selectdeploytarget", "selectjumptarget"],
    },
  },
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "knights"] },
      link: "endTurn",
    },
    jump: {
      applyEffects: [
        { setturnpos: ["jumpedfrom", { onlyin: "myknights" }] },
        { moveat: [{ turnpos: "jumpedfrom" }, "selectjumptarget"] },
        { spawnat: [{ turnpos: "jumpedfrom" }, "marks"] },
      ],
      runGenerators: ["findwinlineheads", "findwinlines"],
      link: "endTurn",
    },
  },
  marks: {
    selectdeploytarget: {
      from: {
        playercase: [
          { subtract: ["board", "units", "center"] },
          { subtract: ["board", "units"] },
        ],
      },
      link: "deploy",
    },
    selectjumptarget: {
      from: "jumptargets",
      link: "jump",
    },
  },
};

export default campaignFlow;
