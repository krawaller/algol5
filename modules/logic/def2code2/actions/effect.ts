import {
  AlgolEffectAnon,
  FullDefAnon,
  isAlgolEffectKillAt,
  isAlgolEffectKillId,
  isAlgolEffectForPosIn,
  isAlgolEffectMulti,
  isAlgolEffectKillIn,
  isAlgolEffectForIdIn,
  isAlgolEffectSetAt,
  isAlgolEffectSetIn,
  isAlgolEffectSetId,
  isAlgolEffectMoveAt,
  isAlgolEffectMoveId,
  isAlgolEffectStompAt,
  isAlgolEffectStompId,
  isAlgolEffectSpawn,
  isAlgolEffectSpawnIn
} from "../../../types";
import makeParser from "../../def2code2/expressions";

export function executeEffect(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  effect: AlgolEffectAnon
): string {
  const parser = makeParser(gameDef, player, action, "effect");
  const me = (efct: AlgolEffectAnon) =>
    executeEffect(gameDef, player, action, efct);
  if (isAlgolEffectKillAt(effect)) {
    const { killat: pos } = effect;
    return `delete UNITDATA[(UNITLAYERS.units[${parser.pos(pos)}] || {}).id];`;
  }
  if (isAlgolEffectKillId(effect)) {
    const { killid: id } = effect;
    return `delete UNITDATA[${parser.val(id)}];`;
  }
  if (isAlgolEffectKillIn(effect)) {
    const { killin: set } = effect;
    return me({ forposin: [set, { killat: ["looppos"] }] });
  }
  if (isAlgolEffectForPosIn(effect)) {
    const {
      forposin: [set, repeatEffect]
    } = effect;
    return `for(let LOOPPOS in ${parser.set(set)}) { ${me(repeatEffect)} }`;
  }
  if (isAlgolEffectMulti(effect)) {
    const { multi: effects } = effect;
    return effects.map(me).join(" ");
  }
  if (isAlgolEffectForIdIn(effect)) {
    const {
      foridin: [set, repeatEffect]
    } = effect;
    const setcode = parser.set(set);
    const safe = (setcode as string).substr(0, 10) === "UNITLAYERS";
    const loopInner = safe
      ? `let LOOPID = ${setcode}[LOOPPOS].id; ${me(repeatEffect)}`
      : `let LOOPID = (UNITLAYERS.units[LOOPPOS]||{}).id; if (LOOPID) { ${me(
          repeatEffect
        )} }`;
    return `for(let LOOPPOS in ${setcode}) { ${loopInner} }`;
  }
  if (isAlgolEffectSetAt(effect)) {
    const {
      setat: [pos, prop, val]
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
      setid: [id, prop, val]
    } = effect;
    return `
      UNITDATA[${parser.val(id)}]= { ...UNITDATA[${parser.val(id)}],
        ${parser.val(prop)}: ${parser.val(val)}
      };
    `;
  }
  if (isAlgolEffectSetIn(effect)) {
    const {
      setin: [set, prop, val]
    } = effect;
    return me({ forposin: [set, { setat: [["looppos"], prop, val] }] });
  }
  if (isAlgolEffectMoveAt(effect)) {
    const {
      moveat: [from, to]
    } = effect;
    return me({ setat: [from, "pos", { pos: to }] });
  }
  if (isAlgolEffectMoveId(effect)) {
    const {
      moveid: [id, to]
    } = effect;
    return me({ setid: [id, "pos", { pos: to }] });
  }
  if (isAlgolEffectStompAt(effect)) {
    const {
      stompat: [from, to]
    } = effect;
    return me({ multi: [{ killat: to }, { moveat: [from, to] }] });
  }
  if (isAlgolEffectStompId(effect)) {
    const {
      stompid: [id, to]
    } = effect;
    return me({ multi: [{ killat: to }, { moveid: [id, to] }] });
  }
  if (isAlgolEffectSpawn(effect)) {
    const {
      spawn: [pos, group, owner, props]
    } = effect;
    return `{
        let newunitid = 'clone'+(++clones);
        UNITDATA[newunitid] = {
          pos: ${parser.pos(pos)},
          id: newunitid,
          group: ${parser.val(group)},
          owner: ${parser.val(owner || ["player"])}
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
  if (isAlgolEffectSpawnIn(effect)) {
    const {
      spawnin: [set, group, owner, props]
    } = effect;
    return me({
      forposin: [set, { spawn: [["looppos"], group, owner, props] }]
    });
  }
  return "";
}
