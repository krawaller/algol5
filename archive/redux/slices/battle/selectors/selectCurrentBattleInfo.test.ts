import { selectCurrentBattleInfo } from "./selectCurrentBattleInfo";

import amazons from "../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../battle/src";
import { AlgolBattleInfo } from "../types";
import { AppState } from "../../../types";
import { GameId } from "../../../../games/dist/list";
import { initialGamesState } from "../../games";
import { initialState } from "../../../initialState";

const amazonsAPI = makeStaticGameAPI(amazons);

describe("the currentBattle selector", () => {
  describe("when there is a battle", () => {
    const battle = amazonsAPI.newBattle();
    const gameId: GameId = "amazons";
    const battleId = "SOME ID";
    const battleInfo: AlgolBattleInfo = {
      battle,
      gameId,
      historyFrame: 0,
    };
    const state: AppState = {
      ...initialState,
      games: {
        ...initialGamesState,
        [gameId]: {
          ...initialGamesState[gameId],
          currentBattleId: battleId,
        },
      },
      battles: {
        [battleId]: battleInfo,
      },
    };
    test("we get the correct battleinfo", () => {
      expect(selectCurrentBattleInfo(state, gameId)).toEqual(battleInfo);
    });
  });
});
