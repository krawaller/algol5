import {
  AlgolContentAnon,
  isAlgolContentText,
  isAlgolContentPos,
  isAlgolContentCmnd,
  isAlgolContentUnitType,
  isAlgolContentUnit,
  isAlgolContentLine,
  isAlgolContentSelect
} from "../../types";

export function getContentText(content: AlgolContentAnon) {
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
    return content.unittype;
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
}
