import { FullDefAnon } from "../../../../../types";

export function executeDescribeStarvation(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = `// temp
  return {
    name: 'someName',
    who: ${player},
    show: Object.keys(step.UNITLAYERS.myunits)
  }
`;
  return ret;
}
