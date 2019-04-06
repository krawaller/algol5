import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon,
  isAlgolInstrLine,
  isAlgolInstrOrList,
  isAlgolInstrVal,
  isAlgolInstrPluralize,
  isAlgolInstrUnitAt,
  isAlgolInstrPos,
  isAlgolIcon
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
    if (isAlgolIcon(instr)) {
      return `{ unittype: "${instr}" }`;
    }
    return `{ text: "${instr}" }`;
  }
  if (Array.isArray(instr)) {
    switch (instr[0]) {
      case "defaultEndTurnInstruction":
        return `defaultInstruction(${player})`;
    }
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
      unit: [
        ${JSON.stringify(gameDef.graphics.icons)}[${exprParser.val({
      read: ["units", instr.unitat, "group"]
    })}],
        ${exprParser.val({ read: ["units", instr.unitat, "owner"] })},
        ${exprParser.pos(instr.unitat)}
      ]
    }`;
  }
  if (isAlgolInstrPos(instr)) {
    return `{ pos: ${exprParser.pos(instr.pos)} }`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
