import { AlgolBattle, AlgolBoardState } from "../../../../types";

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
  return {
    ...battle,
    gameEndedBy: currentStep.LINKS.endedBy,
    winner,
    history: battle.history
      .concat({
        player: battle.player,
        moves: battle.state.entries
      })
      .concat({
        player: 0,
        moves: [
          {
            board: finalBoard,
            description: `Ended by ${currentStep.LINKS.endedBy}, ${
              winner ? `Player ${winner} wins` : "draw"
            }`
          }
        ]
      }),
    state: {
      ...battle.state,
      undo: null,
      board: finalBoard
    }
  };
}
