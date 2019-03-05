import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon
} from "../../../../types";

import { executeExpression } from "../";

export function executeInstruction(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  instr: AlgolInstrAnon
): string {
  return executeExpression(
    gameDef,
    player,
    action,
    executeInstructionInner,
    instr,
    "instr"
  );
}

function executeInstructionInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  instr: AlgolInstrInnerAnon
): string {
  if (typeof instr === "string") {
    if (gameDef.flow.commands[instr]) {
      return `{ command: "${instr}" }`;
    }
    if (gameDef.flow.marks[instr]) {
      return `{ pos: MARKS.${instr} }`;
    }
    return `{ text: "${instr}" }`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
