/*

*/

import isEndGameCommand from '../various/isgameendcmnd';
import getStepInstruction from './getstepinstruction';
import getStepSystemInstruction from './getstepsysteminstruction';
import { pos2coords } from '../../gamesproxy';

import {BattleUI, StepUI, StepControlUI, Session, Step} from '../types';

function isEmptyContent(content){
  return !content || (content.type === "text" && !content.text);
}

export default function getStepControlUI(session: Session, step: Step): StepControlUI {
  let {game,turn,undo,markTimeStamps} = session;
  let controls: StepControlUI = {
    turnStart: session.step.stepid === 'root',
    potentialMarks: [],
    commands: Object.keys(game.commands).reduce((mem,c)=>({...mem,[c]:null}),{}),
    submit: null,
    undo: null,
    instruction: null,
    deadEnds: session.turn.deadEnds && session.turn.deadEnds[step.stepid],
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
    controls.instruction = getStepInstruction(session, step, controls.submit);

    let system = getStepSystemInstruction(session, step, controls.undo);
    if (system){
      controls.instruction.content.push(system);
    }

  } else {

  }
  return controls;
}