import { goToHistoryFrame } from ".";
import { testCreator } from "../../../../utils";
import { staticAPI } from "../../../../../battle/dist/apis/amazons";
import { GameId } from "../../../../../games/dist/list";

const battle = staticAPI.newBattle();
const newBattleId = "NEWBATTLEID";

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
            currentBattle: "foo",
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
      frame: 3,
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
            currentBattle: "foo",
          },
        },
      },
    },
  },
]);
