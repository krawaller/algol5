import { newBattle as newBattleAction } from "./";
import { testCreator } from "../../../../utils";
import { staticAPI } from "../../../../../battle/dist/apis/amazons";

const battle = staticAPI.newBattle();
const newBattleId = "NEWBATTLEID";

testCreator(newBattleAction, [
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
]);
