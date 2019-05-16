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
  isAlgolInstrUnitTypeSet,
  isAlgolInstrUnitTypePos
} from "../../../../types";

import { iconRef } from "../../utils";

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
    if (instr === "endTurn") {
      return `{ endTurn: "end turn" }`;
    }
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
    const group = exprParser.val({ read: ["units", instr.unitat, "group"] });
    return `{
      unit: [${iconRef(group, gameDef.graphics.icons)},
        ${exprParser.val({ read: ["units", instr.unitat, "owner"] })},
        ${exprParser.pos(instr.unitat)}
      ]
    }`;
  }
  if (isAlgolInstrUnitTypePos(instr)) {
    const [groupRaw, ownerRaw, posRaw] = instr.unittypepos;
    const group = exprParser.val(groupRaw);
    const owner = exprParser.val(ownerRaw);
    const pos = exprParser.pos(posRaw);
    return `{unit: [${iconRef(
      group,
      gameDef.graphics.icons
    )}, ${owner}, ${pos}]}`;
  }
  if (isAlgolInstrPos(instr)) {
    return `{ pos: ${exprParser.pos(instr.pos)} }`;
  }
  if (isAlgolInstrUnitType(instr)) {
    const [groupRaw, ownerRaw] = instr.unittype;
    const owner = exprParser.val(ownerRaw);
    const group = exprParser.val(groupRaw);
    return `{ unittype: [${iconRef(
      group,
      gameDef.graphics.icons
    )}, ${owner}] }`;
  }
  if (isAlgolInstrText(instr)) {
    const { text } = instr;
    return `{ text: "${text}" }`;
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
    return `collapseContent({ line: Object.keys(${set}).filter(p => UNITLAYERS.units[p]).map(p => ({ unit: [iconMapping[UNITLAYERS.units[p].group], UNITLAYERS.units[p].owner, p] })).reduce((mem, i, n, list) => {
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
    const icon = `iconMapping[${group}]`;
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
