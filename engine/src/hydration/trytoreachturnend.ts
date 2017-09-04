/*
Used in .hydrateStep for links leading to a new turn, to see if that turn is a dead end
Mutates the given turn with .canend boolean, and returns same boolean
*/

import isTurnEndAction from '../various/isturnendcmnd';
import { Game, Turn } from '../types';

export default function tryToReachTurnEnd(game: Game, turn: Turn): Turn {
  let {steps,links} = turn
  let checkSteps = [steps.root]
  let canalwaysend = game.canalwaysend || {}
  while(!turn.canend && checkSteps.length){
    let step = checkSteps.pop()
    let stepid = step.stepid
    let steplinks = links[stepid]
    let checkActions = Object.keys(steplinks)
    while(!turn.canend && checkActions.length){
      let action = checkActions.pop()
      let func = steplinks[action]
      if (isTurnEndAction(action) || canalwaysend[func]){
        turn.canend = true
      } else {
        let nextstepid = stepid + '-' + action
        checkSteps.push( steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action)) )
      }
    }
  }
  return turn;
};