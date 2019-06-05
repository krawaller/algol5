import { registerBattle } from ".";
import { testCreator } from "../../../../utils";
import { staticAPI } from "../../../../../battle/dist/apis/amazons";

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
      gameId: "amazons",
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
      gameId: "amazons",
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
              },
            },
            currentBattle: newBattleId,
          },
        },
      },
    },
  },
]);
