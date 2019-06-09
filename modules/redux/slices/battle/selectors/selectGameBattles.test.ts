import { selectGameBattles } from "./selectGameBattles";

import amazons from "../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../battle/src";
import { WithAlgolBattleState, AlgolBattleInfo } from "../types";

const amazonsAPI = makeStaticGameAPI(amazons);

describe("the gameBattle selector", () => {
  describe("when there is ", () => {
    const battle = amazonsAPI.newBattle();
    const id = "SOME ID";
    const battleInfo: AlgolBattleInfo = {
      battle,
      historyFrame: 0,
    };
    const gameBattleInfo = {
      currentBattleId: id,
      battles: {
        [id]: battleInfo,
      },
    };
    const state: WithAlgolBattleState = {
      battle: {
        games: {
          amazons: gameBattleInfo,
        },
      },
    };
    test("we get the correct gameBattleInfo", () => {
      expect(selectGameBattles(state, "amazons")).toEqual(gameBattleInfo);
    });
  });
});
