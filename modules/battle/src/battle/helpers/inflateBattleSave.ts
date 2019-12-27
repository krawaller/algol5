import { AlgolGame, AlgolBattle, AlgolBattleSave } from "../../../../types";
import { stepOptions } from "../../../../common";
import { battleAction } from "../battleAction";
import { newBattle } from "../newBattle";

export const inflateBattleSave = (
  game: AlgolGame,
  save: AlgolBattleSave
): AlgolBattle => {
  const actions = save.path.slice();
  let battle = newBattle(game);
  do {
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
  } while (!done(battle, save) && actions.length);
  if (actions.length) {
    throw new Error("Actions remain after inflation was completed");
  }
  if (!done(battle, save)) {
    console.log(battle.turnNumber, battle.player, battle.path);
    throw new Error("Goal not reach after inflation");
  }
  return battle;
};

const battleOptions = (battle: AlgolBattle) => {
  const step = battle.turn.steps[battle.state.currentStepId];
  return stepOptions(step);
};

const done = (battle: AlgolBattle, save: AlgolBattleSave) =>
  save.turn === 0
    ? battle.gameEndedBy && battle.winner === save.player
    : battle.turnNumber === save.turn && battle.player === save.player;

const fastForward = (
  game: AlgolGame,
  battle: AlgolBattle,
  save: AlgolBattleSave
) => {
  let opts = battleOptions(battle);
  while (opts.length === 1 && !done(battle, save)) {
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
