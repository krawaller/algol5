import { selectCurrentBattleInfo } from "./selectCurrentBattleInfo";

import amazons from "../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../battle/src";
import {
  WithAlgolBattleState,
  AlgolGameBattleState,
  AlgolBattleInfo,
} from "../types";

const amazonsAPI = makeStaticGameAPI(amazons);

describe("the currentBattle selector", () => {
  describe("when there is a battle", () => {
    const battle = amazonsAPI.newBattle();
    const id = "SOME ID";
    const battleInfo: AlgolBattleInfo = {
      battle,
      historyFrame: 0,
    };
    const state: WithAlgolBattleState = {
      battle: {
        games: {
          amazons: {
            currentBattleId: id,
            battles: {
              [id]: battleInfo,
            },
          },
        },
      },
    };
    test("we get the correct battleinfo", () => {
      expect(selectCurrentBattleInfo(state, "amazons")).toEqual(battleInfo);
    });
  });
});
