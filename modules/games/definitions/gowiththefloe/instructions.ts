import { GowiththefloeInstructions } from "./_types";

const gowiththefloeInstructions: GowiththefloeInstructions = {
  startTurn: {
    line: ["Select", { playercase: ["seals", "bears"] }, "to move"],
  },
  selectunit: {
    line: [
      "Select",
      "where to move",
      { unitat: "selectunit" },
      {
        ifplayer: [
          2,
          { line: ["or a neighbouring", { unittype: ["seals", 1] }, "to eat"] },
        ],
      },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move the",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to make",
      { unitat: "selectunit" },
      "jump to",
      "selectjumptarget",
    ],
  },
  selecteattarget: {
    line: [
      "Press",
      "eat",
      "to make",
      { unitat: "selectunit" },
      "consume",
      { unitat: "selecteattarget" },
      ", removing both units from the battle",
    ],
  },
};

export default gowiththefloeInstructions;
