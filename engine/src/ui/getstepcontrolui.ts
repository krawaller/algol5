/*

*/

import isEndGameCommand from '../various/isgameendcmnd';
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
    let instruction = game[step.name+turn.player+'instruction'](turn,step);
    if (isEmptyContent(controls.instruction) && controls.submit){
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
    if (instruction.type !== "line"){
      instruction = {
        type: "line",
        content: [instruction]
      };
    }
    controls.instruction = {
      type: "page",
      content: [instruction]
    };
    let hasHistory = turn.turn > 1 || step.path.length > 1; // TODO ?
    let hasUndo = !!controls.undo;
    if (hasHistory && !hasUndo){
      controls.instruction.content.push({
        type: "line",
        content: [
          {type:"text",text:"You can also check the"},
          {type:"cmndref",cmnd:"history"},
          {type:"text",text:"of previous positions"}
        ]
      });
    } else if (!hasHistory && hasUndo){
      controls.instruction.content.push({
        type: "line",
        content: [
          {type:"text",text:"You may also"},
          {type:"cmndref",cmnd:"undo",alias:"undo the " + controls.undo},
          {type:"text",text:"."}
        ]
      });
    } else if (hasHistory && hasUndo){
      controls.instruction.content.push({
        type: "line",
        content: [
          {type:"text",text:"You can also check the"},
          {type:"cmndref",cmnd:"history"},
          {type:"text",text:"of previous positions, or"},
          {type:"cmndref",cmnd:"undo",alias:"undo the " + controls.undo},
          {type:"text",text:"."}
        ]
      });
    }
  } else {
    // TODO - this is never shown, because we don't have instruction anymore. move this?
    controls.instruction = session.winner ? "Player " + session.winner + " won by " + session.endedBy : "Game ended in a draw!";
  }
  return controls;
}