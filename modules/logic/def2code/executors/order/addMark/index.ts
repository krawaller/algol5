import { FullDefAnon } from "../../../../../types";

export function addMark(gameDef: FullDefAnon, player: 1 | 2, action: string) {
  // TODO - save previous marks instead of iterating whole marks object
  return `
  MARKS = {
    ...MARKS,
    ${action}: newMarkPos
  };
`;
}
