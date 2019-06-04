import { updateBattle } from "./";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";
import { newBattle } from "../../../../../battle/src/battle"; // TODO - fix better export?
import amazons from "../../../../../logic/dist/indiv/amazons";
import aries from "../../../../../logic/dist/indiv/aries";

const prevBattle = newBattle(amazons);
const nextBattle = newBattle(aries);
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
              },
            },
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
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
              },
            },
          },
        },
      },
    },
  },
]);
