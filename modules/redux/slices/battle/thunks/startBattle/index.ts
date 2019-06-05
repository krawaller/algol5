import { ThunkAction } from "redux-thunk";

import { makeStaticGameAPI } from "../../../../../battle/src/";

import { AlgolGame } from "../../../../../types";
import { WithAlgolBattleState } from "../../types";
import { GameId } from "../../../../../games/dist/list";

import { registerBattle } from "../../actions/registerBattle";
import { ReducingAction } from "../../../../types";

type StartBattleThunk = ThunkAction<
  string,
  WithAlgolBattleState,
  undefined,
  ReducingAction<string, any, any>
>;

export function makeStartBattle(game: AlgolGame): StartBattleThunk {
  const staticAPI = makeStaticGameAPI(game);
  return dispatch => {
    const battleId = Math.random().toString(); // TODO - better?
    dispatch(
      registerBattle({
        gameId: game.gameId as GameId,
        battle: staticAPI.newBattle(),
        battleId,
      })
    );
    return battleId;
  };
}
