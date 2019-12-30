import { updateBattle } from "./updateBattle";
import { testCreator } from "../../../testUtils";
import { staticAPI } from "../../../../battle/dist/apis/amazons";
import { GameId } from "../../../../games/dist/list";

const prevBattle = staticAPI.newBattle();
const nextBattle = staticAPI.performAction(prevBattle, "mark", "a7");
const battleId = "MYBATTLEID";
const gameId: GameId = "amazons";

testCreator(updateBattle, [
  {
    description: "updating a battle will overwrite it",
    previous: {
      battles: {
        [battleId]: {
          gameId,
          battle: prevBattle,
          historyFrame: 0,
        },
      },
    },
    payload: {
      battleId,
      battle: nextBattle,
    },
    expected: {
      battles: {
        [battleId]: {
          gameId,
          battle: nextBattle,
          historyFrame: 0,
        },
      },
    },
  },
  {
    description: "can optionally also update historyframe",
    previous: {
      battles: {
        [battleId]: {
          gameId,
          battle: prevBattle,
          historyFrame: 0,
        },
      },
    },
    payload: {
      battleId,
      battle: nextBattle,
      historyFrame: 1,
    },
    expected: {
      battles: {
        [battleId]: {
          gameId,
          battle: nextBattle,
          historyFrame: 1,
        },
      },
    },
  },
]);
