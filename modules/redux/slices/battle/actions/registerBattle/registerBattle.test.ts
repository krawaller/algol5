import { registerBattle } from ".";
import { testCreator } from "../../../../testUtils";
import { staticAPI } from "../../../../../battle/dist/apis/amazons";
import { GameId } from "../../../../../games/dist/list";

const battle = staticAPI.newBattle();
const newBattleId = "NEWBATTLEID";

testCreator(registerBattle, [
  {
    description: "starting a new battle will add it to the state",
    previous: {
      battle: {
        games: {},
      },
    },
    payload: {
      gameId: "amazons" as GameId,
      battleId: newBattleId,
      battle,
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {
              [newBattleId]: {
                battle,
                historyFrame: 0,
              },
            },
          },
        },
      },
    },
  },
  {
    description: "activating will also set it as active battle",
    previous: {
      battle: {
        games: {},
      },
    },
    payload: {
      gameId: "amazons" as GameId,
      battleId: newBattleId,
      battle,
      activate: true,
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {
              [newBattleId]: {
                battle,
                historyFrame: 0,
              },
            },
            currentBattleId: newBattleId,
          },
        },
      },
    },
  },
]);
