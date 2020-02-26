import { AlgolGame, AlgolBattle, AlgolBattleSave } from "../../../../types";
import { stepOptions } from "../../../../common";
import lib from "../../../../games/dist/lib";
import { battleAction } from "../battleAction";
import { newBattle } from "../newBattle";

export const inflateBattleSave = (
  game: AlgolGame,
  save: AlgolBattleSave
): AlgolBattle => {
  const actions = save.path.slice();
  let battle = newBattle(game, lib[game.gameId].setups.basic);
  let safetyValve = 0;
  do {
    if (battle.turnNumber > save.turn) {
      throw new Error(`Went past desired turn number`);
    }
    battle = fastForward(game, battle, save);
    const actionIdx = actions.shift()!;
    if (actionIdx === undefined) {
      throw new Error(`Ran out of actions before inflation was complete`);
    }
    let opts = battleOptions(battle);
    const action = opts[actionIdx];
    if (!action) {
      throw new Error(
        `Failed to get index ${actionIdx} among options ${opts.join(",")}`
      );
    }
    battle = executeAction(game, battle, action);
    battle = fastForward(game, battle, save);
  } while (!done(battle, save) && actions.length && ++safetyValve < 1000);
  if (actions.length) {
    throw new Error("Actions remain after inflation was completed");
  }
  if (!done(battle, save)) {
    throw new Error("Goal not reach after inflation");
  }
  return battle;
};

const battleOptions = (battle: AlgolBattle) => {
  if (battle.gameEndedBy) {
    return [];
  }
  const step = battle.turn.steps[battle.state.currentStepId];
  return stepOptions(step);
};

const done = (battle: AlgolBattle, save: AlgolBattleSave) =>
  battle.turnNumber > save.turn ||
  (save.ended
    ? !!battle.gameEndedBy && battle.winner === save.player
    : battle.turnNumber === save.turn && battle.player === save.player);

const fastForward = (
  game: AlgolGame,
  battle: AlgolBattle,
  save: AlgolBattleSave
) => {
  let opts = battleOptions(battle);
  let safetyValve = 0;
  while (opts.length === 1 && !done(battle, save) && ++safetyValve < 1000) {
    battle = executeAction(game, battle, opts[0]);
    opts = battleOptions(battle);
  }
  return battle;
};

const executeAction = (
  game: AlgolGame,
  battle: AlgolBattle,
  action: string
) => {
  if (action === "endTurn") {
    return battleAction(game, battle, "endTurn");
  } else if (action.match(/^[a-z]{1,2}[0-9]{1,2}$/)) {
    return battleAction(game, battle, "mark", action);
  } else {
    return battleAction(game, battle, "command", action);
  }
};
