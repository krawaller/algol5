import {
  FullDefAnon,
  AlgolAnimAnon,
  AlgolAnimInnerAnon,
  isAlgolAnimEnterFrom,
  isAlgolAnimExitTo,
  isAlgolAnimGhost,
  isAlgolAnimEnterIn,
  isAlgolAnimExitIn,
} from "../../../../../types";

import { iconRef } from "../../../utils";

import { executeStatement, makeParser } from "../../../executors";

export function executeAnim(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  anim: AlgolAnimAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    executeAnimInner,
    anim,
    "anim"
  );
}

function executeAnimInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  anim: AlgolAnimInnerAnon
): string {
  if (isAlgolAnimEnterIn(anim)) {
    const [set, from] = anim.enterin;
    return executeAnim(gameDef, player, action, {
      forposin: [set, { enterfrom: [["looppos"], from] }],
    });
  }
  if (isAlgolAnimExitIn(anim)) {
    const [set, to] = anim.exitin;
    return executeAnim(gameDef, player, action, {
      forposin: [set, { exitto: [["looppos"], to] }],
    });
  }
  const parser = makeParser(gameDef, player, action);
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
