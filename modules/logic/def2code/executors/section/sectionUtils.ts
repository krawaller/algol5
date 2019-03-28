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
import { contains, emptyUnitLayers } from "../../../../common";

import { executeOrderSection } from "./section.orders";

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

export function referencesUnitLayers(
  gameDef: FullDefAnon,
  haystack: any
): boolean {
  const unitLayers = emptyUnitLayers(gameDef);
  return contains(haystack, d => !!unitLayers[d]);
}

// TODO - prevent false positives from linkings
export function referencesMarks(gameDef: FullDefAnon, haystack: any): boolean {
  return contains(haystack, d => !!gameDef.flow.marks[d]);
}

export function orderAnalysis(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
) {
  const code = executeOrderSection(gameDef, player, action);
  return {
    marks: !!code.match(/MARKS/),
    turnVars: !!code.match(/TURNVARS/),
    battleVars: !!code.match(/BATTLEVARS/),
    artifacts: !!code.match(/ARTIFACTS/),
    unitLayers: !!code.match(/UNITLAYERS/),
    unitData: !!code.match(/UNITDATA/),
    turn: !!code.match(/TURN[^A-Z]/)
  };
}
