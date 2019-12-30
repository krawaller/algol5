import { goToHistoryFrame } from "./goToHistoryFrame";
import { testCreator } from "../../../testUtils";
import { staticAPI } from "../../../../battle/dist/apis/amazons";
import { GameId } from "../../../../games/dist/list";

const gameId: GameId = "amazons";
const battle = staticAPI.newBattle();

testCreator(goToHistoryFrame, [
  {
    description: "we can switch history frame in a battle",
    previous: {
      battles: {
        foo: {
          battle,
          historyFrame: 0,
          gameId,
        },
      },
    },
    payload: {
      battleId: "foo",
      historyFrame: 3,
    },
    expected: {
      battles: {
        foo: {
          battle,
          historyFrame: 3,
          gameId,
        },
      },
    },
  },
]);
