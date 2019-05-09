import {
  FullDefAnon,
  AlgolAnimAnon,
  AlgolAnimInnerAnon,
  isAlgolAnimEnterFrom,
  isAlgolAnimExitTo,
  isAlgolAnimGhost
} from "../../../../../types";

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
    return `anim.ghosts.push([${parser.pos(from)}, ${parser.pos(
      to
    )}, iconMapping[${parser.val(icon)}], ${parser.val(owner)}])`;
  }
  throw new Error("Unknown Anim: " + JSON.stringify(anim));
}