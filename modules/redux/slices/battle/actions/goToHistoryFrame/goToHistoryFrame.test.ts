import { goToHistoryFrame } from ".";
import { testCreator } from "../../../../testUtils";
import { staticAPI } from "../../../../../battle/dist/apis/amazons";

const battle = staticAPI.newBattle();

testCreator(goToHistoryFrame, [
  {
    description: "switching battle will change to the new one",
    previous: {
      battle: {
        games: {
          amazons: {
            battles: {
              foo: {
                battle,
                historyFrame: 0,
              },
            },
            currentBattleId: "foo",
          },
        },
      },
    },
    payload: {
      gameId: "amazons",
      historyFrame: 3,
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {
              foo: {
                battle,
                historyFrame: 3,
              },
            },
            currentBattleId: "foo",
          },
        },
      },
    },
  },
]);
