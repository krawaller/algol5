import {
  AlgolBattle,
  AlgolGame,
  AlgolBoardState,
  AlgolSetupAnon,
  AlgolVariantAnon,
} from "../../../types";

import { emptyAnim } from "../../../common";

import { firstTurn } from "./turn";

export function newBattle(
  game: AlgolGame,
  setup: AlgolSetupAnon,
  variant: AlgolVariantAnon
): AlgolBattle {
  const turn = firstTurn(game, setup, variant.ruleset);
  const firstBoard: AlgolBoardState = {
    marks: [],
    units: turn.steps.root.UNITDATA,
    anim: emptyAnim,
    potentialMarks: Object.keys(turn.steps.root.LINKS.marks),
  };
  return {
    variant,
    path: [],
    turn,
    turnNumber: 1,
    player: 1,
    history: [
      {
        path: [],
        player: 0,
        turn: 0,
        description: { line: [{ text: "Initial setup" }] },
        board: {
          ...firstBoard,
          potentialMarks: [],
        },
      },
    ],
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undo: null,
      board: firstBoard,
    },
  };
}
