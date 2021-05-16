import { AlgolGame, AlgolBattle } from "../../../../types";
import { isPos } from "../../../../common";
import { battleAction } from "../battleAction";

export const executeAction = (
  game: AlgolGame,
  battle: AlgolBattle,
  action: string
) => {
  if (action === "endTurn") {
    return battleAction(game, battle, "endTurn");
  } else if (isPos(action)) {
    return battleAction(game, battle, "mark", action);
  } else {
    return battleAction(game, battle, "command", action);
  }
};
