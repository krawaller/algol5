import { selectGameBattles } from "./selectGameBattles";

import amazons from "../../../../logic/dist/indiv/amazons";
import aries from "../../../../logic/dist/indiv/aries";
import { makeStaticGameAPI } from "../../../../battle/src";
import { WithAlgolBattleState, AlgolBattleInfo } from "../types";
import { GameId } from "../../../../games/dist/list";

const amazonsAPI = makeStaticGameAPI(amazons);
const ariesAPI = makeStaticGameAPI(aries);

describe("the gameBattle selector", () => {
  describe("when there is ", () => {
    const gameId: GameId = "amazons";
    const amazonsBattle: AlgolBattleInfo = {
      battle: amazonsAPI.newBattle(),
      historyFrame: 0,
      gameId,
    };
    const ariesBattle: AlgolBattleInfo = {
      battle: ariesAPI.newBattle(),
      historyFrame: 0,
      gameId: "aries",
    };
    const state: WithAlgolBattleState = {
      battles: {
        amazonsBattle: amazonsBattle,
        ariesBattle: ariesBattle,
      },
    };
    test("we get the correct gameBattleInfo", () => {
      expect(selectGameBattles(state, "amazons")).toEqual({
        amazonsBattle,
      });
      expect(selectGameBattles(state, "aries")).toEqual({
        ariesBattle,
      });
    });
  });
});
