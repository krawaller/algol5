/*

*/

import isEndGameCommand from '../various/isgameendcmnd';
import {pos2coords} from '../../../common';

import {BattleUI, StepUI, StepControlUI, Session, Step, ComplexContent} from '../types';

export default function getStepSystemInstruction(session: Session, step: Step, undoCmnd: string): ComplexContent {
  let {game,turn} = session;
  let instruction;
  let hasHistory = turn.turn > 1 || step.path.length > 1; // TODO ?
  let hasUndo = !!undoCmnd;
  if (hasHistory && !hasUndo){
    instruction = {
      type: "line",
      content: [
        {type:"text",text:"You can also check the"},
        {type:"cmndref",cmnd:"history"},
        {type:"text",text:"of previous positions"}
      ]
    };
  } else if (!hasHistory && hasUndo){
    instruction = {
      type: "line",
      content: [
        {type:"text",text:"You may also"},
        {type:"cmndref",cmnd:"undo",alias:"undo the " + undoCmnd},
        {type:"text",text:"."}
      ]
    };
  } else if (hasHistory && hasUndo){
    instruction = {
      type: "line",
      content: [
        {type:"text",text:"You can also check the"},
        {type:"cmndref",cmnd:"history"},
        {type:"text",text:"of previous positions, or"},
        {type:"cmndref",cmnd:"undo",alias:"undo the " + undoCmnd},
        {type:"text",text:"."}
      ]
    };
  }
  return instruction;
}