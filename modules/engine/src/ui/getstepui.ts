/*

*/

import * as mapValues from 'lodash/mapValues';
import * as values from 'lodash/values';

import { pos2coords } from '../../gamesproxy';

import {StepUI, Session, Step} from '../types';

export default function getStepUI(session: Session, step: Step): StepUI {
  let {game,turn,undo,markTimeStamps} = session;
  return {
    marks: values(step.MARKS).map(pos=>({pos, coords: pos2coords(pos)})),
    units: mapValues(step.UNITDATA,u=> Object.assign({},u,{
      icon: game.graphics.icons[u.group],
      coords: pos2coords(u.pos),
      spawnCoords: u.from ? pos2coords(u.from) : undefined
    })),
    playing: turn.player,
    turn: turn.turn,
    description: session.endedBy
      ? session.winner
        ? "Player " + session.winner + " won by " + session.endedBy
        : "Game ended in a draw!"
      : "Player " + turn.player + " playing"
  };
}