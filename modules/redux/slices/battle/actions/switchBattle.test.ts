import { switchBattle } from "./switchBattle";
import { testCreator } from "../../../testUtils";
import { staticAPI } from "../../../../battle/dist/apis/amazons";

const battle = staticAPI.newBattle();
const newBattleId = "NEWBATTLEID";

testCreator(switchBattle, [
  {
    description: "switching battle will change to the new one",
    previous: {
      battle: {
        games: {
          amazons: {
            battles: {},
            currentBattleId: "foo",
          },
        },
      },
    },
    payload: {
      gameId: "amazons",
      battleId: "bar",
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {},
            currentBattleId: "bar",
          },
        },
      },
    },
  },
]);
