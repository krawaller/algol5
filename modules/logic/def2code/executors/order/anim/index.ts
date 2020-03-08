import {
  FullDefAnon,
  AlgolAnimAnon,
  AlgolAnimInnerAnon,
  isAlgolAnimEnterFrom,
  isAlgolAnimExitTo,
  isAlgolAnimGhost,
  isAlgolAnimEnterIn,
  isAlgolAnimExitIn,
  isAlgolAnimGhostFromIn,
  isAlgolAnimGhostToIn,
} from "../../../../../types";

import { iconRef } from "../../../utils";

import { executeStatement, makeParser } from "../../../executors";

export function executeAnim(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  anim: AlgolAnimAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    ruleset,
    executeAnimInner,
    anim,
    "anim"
  );
}

function executeAnimInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  anim: AlgolAnimInnerAnon
): string {
  if (isAlgolAnimEnterIn(anim)) {
    const [set, from] = anim.enterin;
    return executeAnim(gameDef, player, action, ruleset, {
      forposin: [set, { enterfrom: [["looppos"], from] }],
    });
  }
  if (isAlgolAnimExitIn(anim)) {
    const [set, to] = anim.exitin;
    return executeAnim(gameDef, player, action, ruleset, {
      forposin: [set, { exitto: [["looppos"], to] }],
    });
  }
  if (isAlgolAnimGhostFromIn(anim)) {
    const [set, to, icon, owner] = anim.ghostfromin;
    return executeAnim(gameDef, player, action, ruleset, {
      forposin: [set, { ghost: [["looppos"], to, icon, owner] }],
    });
  }
  if (isAlgolAnimGhostToIn(anim)) {
    const [set, from, icon, owner] = anim.ghosttoin;
    return executeAnim(gameDef, player, action, ruleset, {
      forposin: [set, { ghost: [from, ["looppos"], icon, owner] }],
    });
  }
  const parser = makeParser(gameDef, player, action, ruleset);
  if (isAlgolAnimEnterFrom(anim)) {
    const [where, from] = anim.enterfrom;
    return `anim.enterFrom[${parser.pos(where)}] = ${parser.pos(from)}; `;
  }
  if (isAlgolAnimExitTo(anim)) {
    const [where, to] = anim.exitto;
    return `anim.exitTo[${parser.pos(where)}] = ${parser.pos(to)}; `;
  }
  if (isAlgolAnimGhost(anim)) {
    const [from, to, icon, owner] = anim.ghost;
    return `anim.ghosts.push([${parser.pos(from)}, ${parser.pos(to)}, ${iconRef(
      parser.val(icon) as string,
      gameDef.graphics.icons
    )}, ${parser.val(owner)}]); `;
  }
  throw new Error("Unknown Anim: " + JSON.stringify(anim));
}
