import {
  AlgolEffectAnon,
  FullDefAnon,
  isAlgolEffectKillAt,
  isAlgolEffectKillId
} from "../../../types";
import makeParser from "../../def2code2/expressions";

export function executeEffect(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  effect: AlgolEffectAnon
): string {
  const parser = makeParser(gameDef, player, action, "effect");
  if (isAlgolEffectKillAt(effect)) {
    const { killat: pos } = effect;
    return `delete UNITDATA[(UNITLAYERS.units[${parser.pos(pos)}] || {}).id];`;
  }
  if (isAlgolEffectKillId(effect)) {
    const { killid: id } = effect;
    return `delete UNITDATA[${parser.val(id)}]`;
  }
  return "";
}
