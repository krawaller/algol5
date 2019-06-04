import { newBattle as newBattleAction } from "./";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";
import { newBattle } from "../../../../../battle/src/battle"; // TODO - fix better export?
import amazons from "../../../../../logic/dist/indiv/amazons";

const battle = newBattle(amazons);
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
              },
            },
          },
        },
      },
    },
  },
]);
