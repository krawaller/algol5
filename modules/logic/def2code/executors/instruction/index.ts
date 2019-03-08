export * from "./instruction.helpers";

import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon,
  isAlgolInstrLine,
  isAlgolInstrOrList,
  isAlgolInstrVal,
  isAlgolInstrPluralize,
  isAlgolInstrUnitAt
} from "../../../../types";

import { executeExpression, makeParser } from "../";

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
  const exprParser = makeParser(gameDef, player, action);
  const me = (i: AlgolInstrAnon) =>
    executeInstruction(gameDef, player, action, i);

  if (!instr) {
    return "undefined";
  }
  if (typeof instr === "number") {
    return `{ text: ${instr} }`;
  }
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
      .map(me)
      .filter(i => i && i !== "undefined")
      .join(", ")} ] })`;
  }
  if (isAlgolInstrOrList(instr)) {
    return `collapseContent({ line: [ ${instr.orlist.map(
      me
    )} ].filter(i => !!i).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " or "});
      } else if (n < list.length - 2){
        mem.push({text: ", " });
      }
      return mem;
    }, []) })`;
  }
  if (isAlgolInstrVal(instr)) {
    return `{ text: ${exprParser.val(instr.value)} }`;
  }
  if (isAlgolInstrPluralize(instr)) {
    const [val, sing, plur] = instr.pluralize;
    return `collapseContent({ line: [
      { text: ${exprParser.val(val)} },
      ${exprParser.val(val)} === 1 ? ${me(sing)} : ${me(plur)}
    ] })`;
  }
  if (isAlgolInstrUnitAt(instr)) {
    // name: game.graphics.icons[${parse.val(["read", "units", pos, "group"])}]
    return `{
      unitpos: [
        ${JSON.stringify(gameDef.graphics.icons)}[${exprParser.val({
      read: ["units", instr.unitat, "group"]
    })}],
        ${exprParser.val({ read: ["units", instr.unitat, "owner"] })},
        ${exprParser.pos(instr.unitat)}
      ]
    }`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
