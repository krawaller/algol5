import { GowiththefloeInstructions } from "./_types";

const gowiththefloeInstructions: GowiththefloeInstructions = {
  startTurn: { line: ["Select", "a unit to move"] },
  selectunit: { line: ["Select", "where to move"] },
  selectmovetarget: { line: ["Press", "move", "to go here"] },
  selecteattarget: { line: ["Press", "eat", "to, well, eat"] }
};

export default gowiththefloeInstructions;
