import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { expressionPossibilities } from "..";

export function actionLinks(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string[] {
  const def: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "startTurn" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things

  return (def.links || [])
    .concat(def.link || [])
    .reduce(
      (mem, linkName) =>
        mem.concat(expressionPossibilities(linkName, player, action)),
      []
    );
}
