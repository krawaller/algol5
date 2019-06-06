import { ThunkAction } from "redux-thunk";

import { makeStaticGameAPI } from "../../../../../battle/src/";

import { AlgolGame } from "../../../../../types";
import { WithAlgolBattleState } from "../../types";
import { GameId } from "../../../../../games/dist/list";

import { updateBattle } from "../../actions/updateBattle";
import { ReducingAction } from "../../../../types";

type MakeMoveThunk = ThunkAction<
  void,
  WithAlgolBattleState,
  undefined,
  ReducingAction<string, any, any>
>;

export function makeMakeMove(
  game: AlgolGame
): (action: "command" | "mark" | "endTurn", arg?: string) => MakeMoveThunk {
  const staticAPI = makeStaticGameAPI(game);
  return (action, arg) => (dispatch, getState) => {
    const currentGame = getState().battle.games[game.gameId as GameId]!;
    const currentBattle =
      currentGame.battles[currentGame.currentBattle!].battle;
    const newBattle = staticAPI.performAction(currentBattle, action, arg);
    dispatch(
      updateBattle({
        gameId: game.gameId as GameId,
        battle: newBattle,
        battleId: currentGame.currentBattle!,
      })
    );
  };
}
