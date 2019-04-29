import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon,
  isAlgolInstrLine,
  isAlgolInstrOrList,
  isAlgolInstrVal,
  isAlgolInstrPluralize,
  isAlgolInstrUnitAt,
  isAlgolInstrUnitType,
  isAlgolInstrPos,
  isAlgolIcon,
  isAlgolInstrText,
  isAlgolInstrPosList,
  isAlgolInstrAndList,
  isAlgolInstrUnitList,
  isAlgolInstrUnitTypeSet
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
      return `{ unittype: ["${instr}", ${player}] }`;
    }
    if (gameDef.graphics.icons[instr]) {
      return `{ unittype: ["${gameDef.graphics.icons[instr]}", ${player}] }`;
    }
    if (instr.toLowerCase() === "select") {
      // TODO - language dependency?
      return `{ select: "${instr}" }`;
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
  if (isAlgolInstrAndList(instr)) {
    return `collapseContent({ line: [ ${instr.andlist.map(
      me
    )} ].filter(i => !!i).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " and "});
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
  if (isAlgolInstrUnitType(instr)) {
    const [group, owner] = instr.unittype;
    return `{ unittype: ["${gameDef.graphics.icons[group]}", ${exprParser.val(
      owner
    )}] }`;
  }
  if (isAlgolInstrText(instr)) {
    const { text } = instr;
    return `{ text: ["${text}"] }`;
  }
  if (isAlgolInstrPosList(instr)) {
    const { poslist } = instr;
    const set = exprParser.set(poslist);
    return `collapseContent({ line: Object.keys(${set}).map(p => ({ pos: p })).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " and "});
      } else if (n < list.length - 2){
        mem.push({text: ", " });
      }
      return mem;
    }, []) })`;
  }
  if (isAlgolInstrUnitList(instr)) {
    const { unitlist } = instr;
    const set = exprParser.set(unitlist);
    return `collapseContent({ line: Object.keys(${set}).filter(p => UNITLAYERS.units[p]).map(p => ({ unit: [${JSON.stringify(
      gameDef.graphics.icons
    )}[UNITLAYERS.units[p].group], UNITLAYERS.units[p].owner, p] })).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " and "});
      } else if (n < list.length - 2){
        mem.push({text: ", " });
      }
      return mem;
    }, []) })`;
  }
  if (isAlgolInstrUnitTypeSet(instr)) {
    const [groupRaw, ownerRaw, setRaw] = instr.unittypeset;
    const group = exprParser.val(groupRaw);
    const icon = `${JSON.stringify(gameDef.graphics.icons)}[${group}]`;
    const set = exprParser.set(setRaw);
    const owner = exprParser.val(ownerRaw);
    return `collapseContent({ line: Object.keys(${set}).map(p => ({ unit: [${icon}, ${owner}, p] })).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " and "});
      } else if (n < list.length - 2){
        mem.push({text: ", " });
      }
      return mem;
    }, []) })`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
