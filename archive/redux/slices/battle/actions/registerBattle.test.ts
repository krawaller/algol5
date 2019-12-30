import { registerBattle } from "./registerBattle";
import { testCreator } from "../../../testUtils";
import { staticAPI } from "../../../../battle/dist/apis/amazons";
import { GameId } from "../../../../games/dist/list";
import { initialGamesState } from "../../games/initialState";

const battle = staticAPI.newBattle();
const newBattleId = "NEWBATTLEID";
const gameId: GameId = "amazons";

testCreator(registerBattle, [
  {
    description: "starting a new battle will add it to the state",
    previous: {
      battles: {},
    },
    payload: {
      gameId,
      battleId: newBattleId,
      battle,
    },
    expected: {
      battles: {
        [newBattleId]: {
          battle,
          historyFrame: 0,
          gameId,
        },
      },
    },
  },
  {
    description: "activating will also set it as active battle for that game",
    previous: {
      battles: {},
      games: initialGamesState,
    },
    payload: {
      gameId: "amazons" as GameId,
      battleId: newBattleId,
      battle,
      activate: true,
    },
    expected: {
      battles: {
        [newBattleId]: {
          battle,
          historyFrame: 0,
          gameId,
        },
      },
      games: {
        ...initialGamesState,
        [gameId]: {
          ...initialGamesState[gameId],
          currentBattleId: newBattleId,
        },
      },
    },
  },
]);
