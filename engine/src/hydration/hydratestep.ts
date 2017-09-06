/*
Used in .hydrateTurn, and will recursively call itself
Mutates the given turn with links for the given step
Will create linked steps if they didn't exist and hydrate those,
but only keep them around if they lead to turn end.
Returns whether or not the given step can lead to turn end
*/

import tryToReachTurnEnd from './trytoreachturnend';
import isEndGameAction from '../various/isgameendcmnd';
import { Game, Turn, Step } from '../types';

export default function hydrateStep(game: Game, turn: Turn, step: Step): boolean {
  let steps = turn.steps
  let stepid = step.stepid
  let links = turn.links
  let steplinks = links[stepid]
  let checkActions = Object.keys(steplinks)
  let canend = false
  while(checkActions.length){
    let action = checkActions.pop()
    let func = steplinks[action]
    if (isEndGameAction(action)){
      turn.ends[action].push(stepid)
      canend = true
    } else if (action === 'endturn'){
      let newturn = tryToReachTurnEnd(game, game[func](turn,step))
      if (newturn.canend){
        turn.next[stepid] = newturn
      } else {
        steplinks.win = newturn.blockedby || 'starvation' // TODO - gamespec logic?
        turn.ends.win.push(stepid)
        delete steplinks.endturn
      }
      canend = true
    } else {
      let nextstepid = stepid + '-' + action;
      let nextstep = steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action))
      if (hydrateStep(game,turn,nextstep)){
        canend = true
      } else {
        delete steplinks[action] // TODO - only this is actually needed
        delete steps[nextstepid]
        delete links[nextstepid]
      }
    }
  }
  return canend
}