import {
  AlgolEffectAnon,
  FullDefAnon,
  isAlgolEffectKillAt
} from "../../../types";
import makeParser from "../../def2code/expressions";

export function executeEffect(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  effect: AlgolEffectAnon
): string {
  const parser = makeParser(gameDef, player, action);
  if (isAlgolEffectKillAt(effect)) {
    const { killat: pos } = effect;
    return `delete UNITDATA[(UNITLAYERS.units[${parser.pos(pos)}] || {}).id];`;
  }
  return "";
}
