import {
  FullDefAnon,
  isAlgolEffectSetTurnVar,
  isAlgolEffectSetTurnPos,
  isAlgolValBattleVar,
  isAlgolValTurnVar,
  isAlgolPosTurnPos,
  isAlgolPosBattlePos,
  isAlgolEffectSetBattlePos,
  isAlgolEffectSetBattleVar,
  isAlgolEffectSpawnAt,
  isAlgolEffectSpawnIn
} from "../../../../types";
import { contains } from "../../../../common";

export function ifCodeContains(
  code: string,
  lines: { [needle: string]: string }
) {
  return Object.keys(lines).reduce(
    (mem, needle) => (code.match(needle) ? mem + " " + lines[needle] : mem),
    ""
  );
}

export function usesTurnVars(search: FullDefAnon | any): boolean {
  return contains(
    search,
    d =>
      isAlgolEffectSetTurnPos(d) ||
      isAlgolEffectSetTurnVar(d) ||
      isAlgolPosTurnPos(d) ||
      isAlgolValTurnVar(d)
  );
}

export function usesBattleVars(search: FullDefAnon | any): boolean {
  return contains(
    search,
    d =>
      isAlgolEffectSetBattlePos(d) ||
      isAlgolEffectSetBattleVar(d) ||
      isAlgolPosBattlePos(d) ||
      isAlgolValBattleVar(d)
  );
}

export function usesSpawn(search: FullDefAnon | any): boolean {
  return contains(
    search,
    d => isAlgolEffectSpawnAt(d) || isAlgolEffectSpawnIn(d)
  );
}

export function usesTurnNumber(search: FullDefAnon | any): boolean {
  return contains(
    search,
    d => Array.isArray(d) && d.length === 1 && d[0] === "turn"
  );
}
