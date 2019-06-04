import {
  AlgolContentAnon,
  isAlgolContentText,
  isAlgolContentPos,
  isAlgolContentCmnd,
  isAlgolContentUnitType,
  isAlgolContentUnit,
  isAlgolContentLine,
  isAlgolContentSelect,
  isAlgolContentEndTurn,
  isAlgolContentPlayer,
} from "../../types";

export function getContentText(content: AlgolContentAnon): string | number {
  if (isAlgolContentText(content)) {
    return content.text;
  }
  if (isAlgolContentPos(content)) {
    return content.pos;
  }
  if (isAlgolContentCmnd(content)) {
    return content.command;
  }
  if (isAlgolContentUnitType(content)) {
    return `plr ${content.unittype[1]} ${content.unittype[0]}`;
  }
  if (isAlgolContentUnit(content)) {
    const [group, owner, pos] = content.unit;
    return `${pos} ${group}`; // TODO - plr specific etc :P
  }
  if (isAlgolContentLine(content)) {
    return content.line.reduce((mem, c) => mem + getContentText(c), "");
  }
  if (isAlgolContentSelect(content)) {
    return content.select;
  }
  if (isAlgolContentEndTurn(content)) {
    return content.endTurn;
  }
  if (isAlgolContentPlayer(content)) {
    return `player ${content.player}`;
  }
  throw new Error(
    "Dont know how to make text from this content: " + JSON.stringify(content)
  );
}
