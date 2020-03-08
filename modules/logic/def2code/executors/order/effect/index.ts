import {
  AlgolEffectAnon,
  AlgolEffectInnerAnon,
  FullDefAnon,
  isAlgolEffectKillAt,
  isAlgolEffectKillId,
  isAlgolEffectKillIn,
  isAlgolEffectSetAt,
  isAlgolEffectSetIn,
  isAlgolEffectSetId,
  isAlgolEffectMoveAt,
  isAlgolEffectMoveId,
  isAlgolEffectStompAt,
  isAlgolEffectStompId,
  isAlgolEffectSpawnAt,
  isAlgolEffectSpawnIn,
  isAlgolEffectSetTurnVar,
  isAlgolEffectSetTurnPos,
  isAlgolEffectSetBattleVar,
  isAlgolEffectSetBattlePos,
  isAlgolEffectPushIn,
  isAlgolEffectPushAt,
  isAlgolEffectMorphAt,
  isAlgolEffectMorphIn,
  isAlgolEffectMorphId,
  isAlgolEffectAdoptAt,
  isAlgolEffectAdoptIn,
  isAlgolEffectAdoptId,
  AlgolEffectSpawnAtAnon,
} from "../../../../../types";

import { executeStatement, makeParser } from "../../../executors";

export function executeEffect(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  effect: AlgolEffectAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    ruleset,
    executeEffectInner,
    effect,
    "effect"
  );
}

function executeEffectInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  effect: AlgolEffectInnerAnon
): string {
  const parser = makeParser(gameDef, player, action, "effect");
  const me = (efct: AlgolEffectAnon) =>
    executeEffect(gameDef, player, action, ruleset, efct);

  // -------------------------- Primitive effects --------------------------

  if (isAlgolEffectKillAt(effect)) {
    const { killat: pos } = effect;
    return `delete UNITDATA[(UNITLAYERS.units[${parser.pos(pos)}] || {}).id];`;
  }
  if (isAlgolEffectKillId(effect)) {
    const { killid: id } = effect;
    return `delete UNITDATA[${parser.val(id)}];`;
  }
  if (isAlgolEffectSetTurnVar(effect)) {
    const {
      setturnvar: [name, val],
    } = effect;
    const parsedName = parser.val(name) + "";
    return `TURNVARS${
      parsedName.match(/^["']/)
        ? `.${parsedName.replace(/(^["']|["']$)/g, "")}`
        : `[${parsedName}]`
    } = ${parser.val(val)};`;
  }
  if (isAlgolEffectSetTurnPos(effect)) {
    const {
      setturnpos: [name, pos],
    } = effect;
    const parsedName = parser.val(name) + "";
    return `TURNVARS${
      parsedName.match(/^["']/)
        ? `.${parsedName.replace(/(^["']|["']$)/g, "")}`
        : `[${parsedName}]`
    } = ${parser.pos(pos)};`;
  }
  if (isAlgolEffectSetBattleVar(effect)) {
    const {
      setbattlevar: [name, val],
    } = effect;
    const parsedName = parser.val(name) + "";
    return `BATTLEVARS${
      parsedName.match(/^["']/)
        ? `.${parsedName.replace(/(^["']|["']$)/g, "")}`
        : `[${parsedName}]`
    } = ${parser.val(val)};`;
  }
  if (isAlgolEffectSetBattlePos(effect)) {
    const {
      setbattlepos: [name, pos],
    } = effect;
    const parsedName = parser.val(name) + "";
    return `BATTLEVARS${
      parsedName.match(/^["']/)
        ? `.${parsedName.replace(/(^["']|["']$)/g, "")}`
        : `[${parsedName}]`
    } = ${parser.pos(pos)};`;
  }
  if (isAlgolEffectSetAt(effect)) {
    const {
      setat: [pos, prop, val],
    } = effect;
    return `{
      let unitid = (UNITLAYERS.units[${parser.pos(pos)}] || {}).id;
      if (unitid){
        UNITDATA[unitid]= {
          ...UNITDATA[unitid],
          ${parser.val(prop)}:${parser.val(val)}
        };
      }
    }
  `;
  }
  if (isAlgolEffectSetId(effect)) {
    const {
      setid: [id, prop, val],
    } = effect;
    return `
      UNITDATA[${parser.val(id)}]= { ...UNITDATA[${parser.val(id)}],
        ${parser.val(prop)}: ${parser.val(val)}
      };
    `;
  }
  if (isAlgolEffectSpawnAt(effect)) {
    const {
      spawnat: [pos, group, owner, props],
    } = effect;
    return `{
        let newunitid = 'spawn'+(NEXTSPAWNID++);
        UNITDATA[newunitid] = {
          pos: ${parser.pos(pos)},
          id: newunitid,
          group: ${parser.val(group)},
          owner: ${parser.val(owner !== undefined ? owner : player)}
          ${
            props
              ? `, ${Object.keys(props)
                  .map(key => `${key}: ${parser.val(props[key])}`)
                  .join(", ")}`
              : ""
          }
        }; 
      }`;
  }
  if (isAlgolEffectPushAt(effect)) {
    const {
      pushat: [pos, dir, dist],
    } = effect;
    const newPos = `offsetPos(${parser.pos(pos)}, ${parser.val(
      dir
    )}, ${parser.val(dist || 1)}, 0, dimensions)`;
    return `{
      let unitid = (UNITLAYERS.units[${parser.pos(pos)}] || {}).id;
      if (unitid){
        UNITDATA[unitid]= {
          ...UNITDATA[unitid],
          pos: ${newPos}
        };
      }
    }
  `;
  }

  // -------------------------- Composite effects --------------------------

  if (isAlgolEffectKillIn(effect)) {
    const { killin: set } = effect;
    return me({ forposin: [set, { killat: ["looppos"] }] });
  }

  if (isAlgolEffectSetIn(effect)) {
    const {
      setin: [set, prop, val],
    } = effect;
    return me({ forposin: [set, { setat: [["looppos"], prop, val] }] });
  }
  if (isAlgolEffectMoveAt(effect)) {
    const {
      moveat: [from, to],
    } = effect;
    return me({ setat: [from, "pos", { pos: to }] });
  }
  if (isAlgolEffectMoveId(effect)) {
    const {
      moveid: [id, to],
    } = effect;
    return me({ setid: [id, "pos", { pos: to }] });
  }
  if (isAlgolEffectStompAt(effect)) {
    const {
      stompat: [from, to],
    } = effect;
    return me({ multi: [{ killat: to }, { moveat: [from, to] }] });
  }
  if (isAlgolEffectStompId(effect)) {
    const {
      stompid: [id, to],
    } = effect;
    return me({ multi: [{ killat: to }, { moveid: [id, to] }] });
  }

  if (isAlgolEffectSpawnIn(effect)) {
    const {
      spawnin: [set, group],
    } = effect;
    return me({
      forposin: [
        set,
        {
          // spawnin[2] is owner, spawnin[3] is props, both can be undefined
          spawnat: [["looppos"], group, effect.spawnin[2]!, effect.spawnin[3]!],
        },
      ],
    });
  }
  if (isAlgolEffectPushIn(effect)) {
    const {
      pushin: [set, dir, dist],
    } = effect;
    return me({ forposin: [set, { pushat: [["looppos"], dir, dist || 1] }] });
  }
  if (isAlgolEffectMorphAt(effect)) {
    const {
      morphat: [pos, group],
    } = effect;
    return me({ setat: [pos, "group", group] });
  }
  if (isAlgolEffectMorphId(effect)) {
    const {
      morphid: [id, group],
    } = effect;
    return me({ setid: [id, "group", group] });
  }
  if (isAlgolEffectMorphIn(effect)) {
    const {
      morphin: [set, group],
    } = effect;
    return me({ forposin: [set, { morphat: [["looppos"], group] }] });
  }
  if (isAlgolEffectAdoptAt(effect)) {
    const {
      adoptat: [pos, owner],
    } = effect;
    return me({ setat: [pos, "owner", owner] });
  }
  if (isAlgolEffectAdoptId(effect)) {
    const {
      adoptid: [id, owner],
    } = effect;
    return me({ setid: [id, "owner", owner] });
  }
  if (isAlgolEffectAdoptIn(effect)) {
    const {
      adoptin: [set, owner],
    } = effect;
    return me({ forposin: [set, { adoptat: [["looppos"], owner] }] });
  }

  return "";
}
