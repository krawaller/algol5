import {
  FullDefAnon,
  AlgolGameBlobAnon,
  AlgolVal,
  AlgolStatement,
} from "../../../../../types";
import { executeStatement, makeParser } from "../../../executors";

export function executePurge(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  layer: AlgolStatement<AlgolGameBlobAnon, AlgolVal<AlgolGameBlobAnon, string>>
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    ruleset,
    executePurgeInner,
    layer,
    "purge"
  );
}

function executePurgeInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  layer: AlgolVal<AlgolGameBlobAnon, string>
): string {
  const parser = makeParser(gameDef, player, action, ruleset);
  if (typeof layer === "string") {
    return `ARTIFACTLAYERS.${layer} = {}; `;
  }
  return `ARTIFACTLAYERS[${parser.val(layer)}] = {}; `;
}
