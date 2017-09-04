/*
Returns an object with the 4 turn-ending actions, and an array of steps for each.s
*/

import {Turn} from '../types';

type Ends = {
  endturn: string[],
  win: string[],
  lose: string[],
  draw: string[]
}

export default function endStepsForTurnByCmnd(turn: Turn): Ends {
  return ['win','lose','draw'].reduce((mem,cmnd) => ({
    ...mem,
    [cmnd]: turn.ends[cmnd]
  }),{
    endturn: Object.keys(turn.next), win: [], lose: [], draw: []
  });
}