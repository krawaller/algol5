/*

*/

import isEndGameCommand from '../various/isgameendcmnd';
import { pos2coords } from '../../gamesproxy';

import {BattleUI, CurrentStepUI, StepUI, StepControlUI, Session, Step} from '../types';

export default function getStepControlUI(session: Session, step: Step): StepControlUI {
  let {game,turn,undo,markTimeStamps} = session;
  let controls: StepControlUI = {
    turnStart: session.step.stepid === 'root',
    potentialMarks: [],
    commands: Object.keys(game.commands).reduce((mem,c)=>({...mem,[c]:null}),{}),
    submit: null,
    undo: null,
    instruction: null,
  };
  if (!session.endedBy){
    controls.undo = undo.length ? undo[undo.length-1].actionName : null;
    let links = Object.keys(turn.links[step.stepid]).forEach(action=> {
      if (isEndGameCommand(action)||action=='endturn'||action==='next'){
        controls.submit = action as typeof controls.submit;
      } else if (game.commands[action]){
        controls.commands[action] = action;
      } else {
        controls.potentialMarks.push({
          coords: pos2coords(action),
          pos: action
        });
      }
    });
    controls.instruction = game[step.name+turn.player+'instruction'](step);
  } else {
    controls.instruction = session.winner ? "Player " + session.winner + " won by " + session.endedBy : "Game ended in a draw!";
  }
  return controls;
}