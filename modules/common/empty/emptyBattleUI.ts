import { AlgolBattleUI } from "../../types";
import { GameId } from "../../games/dist/list";
import { emptyAnim } from "./emptyAnim";

export const emptyBattleUI: AlgolBattleUI = {
  endTurn: false,
  commands: [],
  gameId: "foo" as GameId,
  instruction: undefined,
  player: 0,
  undo: null,
  turnNumber: 1,
  board: {
    anim: emptyAnim,
    marks: [],
    potentialMarks: [],
    units: {},
  },
};
