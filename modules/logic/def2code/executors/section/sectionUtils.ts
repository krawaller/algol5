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

export function mutatesTurnVars(search): boolean {
  return contains(
    search,
    d => isAlgolEffectSetTurnPos(d) || isAlgolEffectSetTurnVar(d)
  );
}

export function readsTurnVars(search: FullDefAnon | any): boolean {
  return contains(search, d => isAlgolPosTurnPos(d) || isAlgolValTurnVar(d));
}

export function referencesTurnVars(search): boolean {
  return readsTurnVars(search) || mutatesTurnVars(search);
}

export function mutatesBattleVars(search): boolean {
  return contains(
    search,
    d => isAlgolEffectSetBattlePos(d) || isAlgolEffectSetBattleVar(d)
  );
}

export function readsBattleVars(search: FullDefAnon | any): boolean {
  return (
    mutatesBattleVars(search) ||
    contains(search, d => isAlgolPosBattlePos(d) || isAlgolValBattleVar(d))
  );
}

export function referencesBattleVars(search): boolean {
  return readsBattleVars(search) || mutatesBattleVars(search);
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
