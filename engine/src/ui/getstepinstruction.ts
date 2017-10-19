/*

*/

import isEndGameCommand from '../various/isgameendcmnd';
import { pos2coords } from '../../gamesproxy';

import {BattleUI, StepUI, StepControlUI, Session, Step, ComplexContent} from '../types';

function isEmptyContent(content){
  return !content || (content.type === "text" && !content.text);
}

export default function getStepInstruction(session: Session, step: Step, canSubmit: boolean): ComplexContent {
  let {game,turn} = session;
  let instruction;
  if (!session.endedBy){
    instruction = game[step.name+turn.player+'instruction'](turn,step);
    if (isEmptyContent(instruction) && canSubmit){
      instruction = {
        type: "line",
        content: [{
          type: "text",
          text: "Press"
        },{
          type: "cmndref",
          cmnd: "endturn",
          alias: "submit"
        },{
          type: "text",
          text: "to end your turn."
        }]
      };
    };
  } else {
    // TODO - this is never shown, because we don't have instruction anymore. move this?
    instruction = {
      type:"line",
      content:[session.winner ? "Player " + session.winner + " won by " + session.endedBy : "Game ended in a draw!"]
    };
  }
  if (instruction.type !== "line"){
    instruction = {
      type: "line",
      content: [instruction]
    };
  }
  instruction = {
    type: "page",
    content: [instruction]
  };
  console.log("INSTR",instruction);
  return instruction;
}