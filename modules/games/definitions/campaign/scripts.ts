import { CampaignDefinition } from "./_types";

const campaignScripts: CampaignDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["f5", "deploy", "endTurn"] },
      { commands: ["d6", "deploy", "endTurn"] },
      { commands: ["d4", "jump", "endTurn"] },
      { commands: ["e4", "jump", "endTurn"] },
      { commands: ["e6", "jump", "endTurn"] },
      { commands: ["c5", "jump", "endTurn"] },
      { commands: ["f4", "jump", "endTurn"] },
      { commands: ["d3", "jump", "endTurn"] },
      { commands: ["d5", "jump", "endTurn"] },
      { commands: ["b4", "jump", "endTurn"] },
    ],
  },
];

export default campaignScripts;
