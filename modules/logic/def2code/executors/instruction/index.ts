export * from "./instruction.helpers";

import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon,
  isAlgolInstrLine
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
  if (isAlgolInstrLine(instr)) {
    return `collapseContent({ line: [ ${instr.line
      .map(i => executeInstruction(gameDef, player, action, i))
      .filter(i => !!i)
      .join(", ")} ] })`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
