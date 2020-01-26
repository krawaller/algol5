import { AlgolBattleSave } from "../../../types";
import { GameId } from "../../../games/dist/list";
import id2code from "../../../games/dist/id2code";
import { stringifyBattleSave } from "../battleSave";

export const stringifySeed = (
  save: AlgolBattleSave,
  gameId: GameId,
  method = 0
) => {
  return id2code[gameId] + stringifyBattleSave(save, method);
};
