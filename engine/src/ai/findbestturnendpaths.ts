/*
Returns array of best moves for finishing current turn according to named brain.
TODO - also add lose and draw!
*/
import {Session} from '../types';

export default function findBestTurnEndPaths({game,turn}:Session, brain: string): string[][] {
  let func = game['brain_'+brain+'_'+turn.player],
  winners = [], highscore = -1000000;
  if (turn.ends.win.length){
    winners = turn.ends.win.map(winId => turn.steps[winId].path.concat('win'));
  } else {
    for(var stepid in turn.next){
      var stepscore = func(turn.steps[stepid])
      if (stepscore > highscore){
        winners = [turn.steps[stepid].path.concat('endturn')]
        highscore = stepscore
      } else if (stepscore === highscore) {
        winners.push(turn.steps[stepid].path.concat('endturn'))
      }
    }
  }
  console.log("FFS",winners,"OMG",turn.ends)
  return winners;
}