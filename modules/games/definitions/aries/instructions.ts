import { AriesInstructions } from './_types';

const ariesInstructions: AriesInstructions = {
  startTurn: { line: ["Select", "soldiers", "to move"] },
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
      {
        if: [
          { notempty: "squished" },
          { line: ["and squash", { unitat: { onlyin: "squished" } }] }
        ]
      }
    ]
  }
};

export default ariesInstructions;
