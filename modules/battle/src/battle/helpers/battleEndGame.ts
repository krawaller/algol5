import {
  AlgolBattle,
  AlgolBoardState,
  AlgolContentAnon
} from "../../../../types";

export function battleEndGame(battle: AlgolBattle): AlgolBattle {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  const winner = {
    win: battle.player,
    lose: battle.player === 1 ? 2 : 1,
    draw: 0
  }[currentStep.LINKS.endGame as "win" | "lose" | "draw"] as 0 | 1 | 2;
  const finalBoard: AlgolBoardState = {
    marks: currentStep.LINKS.endMarks || [],
    units: currentStep.UNITDATA,
    anim: { enterFrom: {}, exitTo: {}, ghosts: [] }
  };
  const description: AlgolContentAnon = {
    line: ([
      { text: "Ended by" },
      { bold: currentStep.LINKS.endedBy as string }
    ] as AlgolContentAnon[]).concat(
      winner
        ? [{ text: ", " }, { player: winner as 1 | 2 }, { text: " wins!" }]
        : [{ text: " in a draw!" }]
    )
  };

  return {
    ...battle,
    gameEndedBy: currentStep.LINKS.endedBy,
    winner,
    history: battle.history.concat(battle.state.entries).concat({
      turn: currentStep.TURN,
      player: 0,
      board: finalBoard,
      description
    }),
    state: {
      ...battle.state,
      undo: null,
      board: finalBoard
    }
  };
}
