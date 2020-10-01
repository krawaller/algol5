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
  isAlgolEffectSpawnIn,
} from "../../../../types";
import { contains } from "../../../../common";

import { executeOrderSection } from "./section.orders";

export function mutatesTurnVars(search: any): boolean {
  return contains(
    search,
    (d: any) => isAlgolEffectSetTurnPos(d) || isAlgolEffectSetTurnVar(d)
  );
}

export function readsTurnVars(search: FullDefAnon | any): boolean {
  return contains(
    search,
    (d: any) => isAlgolPosTurnPos(d) || isAlgolValTurnVar(d)
  );
}

export function referencesTurnVars(search: any): boolean {
  return readsTurnVars(search) || mutatesTurnVars(search);
}

export function mutatesBattleVars(search: any): boolean {
  return contains(
    search,
    (d: any) => isAlgolEffectSetBattlePos(d) || isAlgolEffectSetBattleVar(d)
  );
}

export function readsBattleVars(search: FullDefAnon | any): boolean {
  return (
    mutatesBattleVars(search) ||
    contains(
      search,
      (d: any) => isAlgolPosBattlePos(d) || isAlgolValBattleVar(d)
    )
  );
}

export function referencesBattleVars(search: any): boolean {
  return (
    readsBattleVars(search) ||
    mutatesBattleVars(search) ||
    (search && search.battleVars)
  );
}

export function usesSpawn(search: FullDefAnon | any): boolean {
  return contains(
    search,
    (d: any) => isAlgolEffectSpawnAt(d) || isAlgolEffectSpawnIn(d)
  );
}

type Deed = "mutates" | "reads";
type Vars =
  | "MARKS"
  | "TURNVARS"
  | "BATTLEVARS"
  | "UNITDATA"
  | "UNITLAYERS"
  | "ARTIFACTS"
  | "TURN"
  | "NEXTSPAWNID"
  | "LINKS";

const vars: Vars[] = [
  "MARKS",
  "TURNVARS",
  "BATTLEVARS",
  "UNITDATA",
  "UNITLAYERS",
  "ARTIFACTS",
  "TURN",
  "NEXTSPAWNID",
  "LINKS",
];

export function codeUsage(code: string): { [v in Vars]: Deed } {
  return vars.reduce((mem, v) => {
    if (!code.match(new RegExp(`(^|[^A-Za-z_$0-9])${v}[^A-Za-z_$0-9]`))) {
      return mem;
    } else if (code.match(new RegExp(`delete\\s${v}[^A-Za-z_$0-9]`))) {
      return {
        ...mem,
        [v]: "mutates" as Deed,
      };
    } else if (
      code.match(new RegExp(`(^|[^A-Za-z_$0-9])${v}[^;\\)=]*\\s*=[^=]`))
    ) {
      return {
        ...mem,
        [v]: "mutates" as Deed,
      };
    } else {
      return {
        ...mem,
        [v]: "reads" as Deed,
      };
    }
    return mem;
  }, {} as { [v in Vars]: Deed });
}

export function orderUsage(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): { [v: string]: Deed } {
  const code = executeOrderSection(gameDef, player, action, ruleset);

  return codeUsage(code);
}
