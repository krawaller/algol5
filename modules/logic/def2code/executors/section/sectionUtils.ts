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

import { executeOrderSection } from "./section.orders";

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

type Deed = "mutates" | "reads";

export function orderUsage(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  vars: string[] = [
    "MARKS",
    "TURNVARS",
    "BATTLEVARS",
    "UNITDATA",
    "UNITLAYERS",
    "ARTIFACTS",
    "TURN",
    "NEXTSPAWNID"
  ]
): { [v: string]: Deed } {
  const code = executeOrderSection(gameDef, player, action);

  return vars.reduce(
    (mem, v) => {
      if (!code.match(new RegExp(`(^|[^A-Za-z_$0-9])${v}[^A-Za-z_$0-9]`))) {
        return mem;
      } else if (
        code.match(
          new RegExp(
            `delete\\s${v}(\\.[A-Za-z_$0-9]+|\\[["'][A-Za-z_$0-9]+["']\\])+`
          )
        )
      ) {
        return {
          ...mem,
          [v]: "mutates" as Deed
        };
      } else if (
        code.match(
          new RegExp(
            `(^|[^A-Za-z_$0-9])${v}(\\.[A-Za-z_$0-9]+|\\[["'][A-Za-z_$0-9]+["']\\])*\\s=[^=]`
          )
        )
      ) {
        return {
          ...mem,
          [v]: "mutates" as Deed
        };
      } else {
        return {
          ...mem,
          [v]: "reads" as Deed
        };
      }
      return mem;
    },
    {} as { [v: string]: Deed }
  );
}
