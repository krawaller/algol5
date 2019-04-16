import { AlgolBattle } from "../../../../types";

export function battleEndGame(battle: AlgolBattle): AlgolBattle {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  const winner = {
    win: battle.player,
    lose: battle.player === 1 ? 2 : 1,
    draw: 0
  }[currentStep.LINKS.endGame] as 0 | 1 | 2;
  return {
    ...battle,
    history: battle.history
      .concat({
        player: battle.player,
        moves: battle.state.entries
      })
      .concat({
        player: 0,
        moves: [
          {
            board: battle.history
              .slice(-1)
              .pop()
              .moves.slice(-1)
              .pop().board,
            description: `Ended by ${currentStep.LINKS.endedBy}, ${
              winner ? `Player ${winner} wins` : "draw"
            }`,
            highlights: currentStep.LINKS.endMarks
          }
        ]
      }),
    state: {
      ...battle.state,
      gameEndedBy: currentStep.LINKS.endedBy,
      winner
    }
  };
}
