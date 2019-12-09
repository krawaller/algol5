import { updateBattle } from "./updateBattle";
import { testCreator } from "../../../testUtils";
import { staticAPI } from "../../../../battle/dist/apis/amazons";

const prevBattle = staticAPI.newBattle();
const nextBattle = staticAPI.performAction(prevBattle, "mark", "a7");
const myBattleId = "MYBATTLEID";

testCreator(updateBattle, [
  {
    description: "updating a battle will overwrite it",
    previous: {
      battle: {
        games: {
          amazons: {
            battles: {
              [myBattleId]: {
                battle: prevBattle,
                historyFrame: 0,
              },
            },
          },
        },
      },
    },
    payload: {
      gameId: "amazons",
      battleId: myBattleId,
      battle: nextBattle,
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {
              [myBattleId]: {
                battle: nextBattle,
                historyFrame: 0,
              },
            },
          },
        },
      },
    },
  },
  {
    description: "can optionally also update historyframe",
    previous: {
      battle: {
        games: {
          amazons: {
            battles: {
              [myBattleId]: {
                battle: prevBattle,
                historyFrame: 0,
              },
            },
          },
        },
      },
    },
    payload: {
      gameId: "amazons",
      battleId: myBattleId,
      battle: nextBattle,
      historyFrame: 1,
    },
    expected: {
      battle: {
        games: {
          amazons: {
            battles: {
              [myBattleId]: {
                battle: nextBattle,
                historyFrame: 1,
              },
            },
          },
        },
      },
    },
  },
]);
