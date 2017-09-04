import * as random from 'lodash/random';

import endStepsForTurnByCommand from '../various/endstepsforturnbycmnd';

import {Session} from '../types';

// TODO - randomize with seed!
export default function getRandomTurnEndPath({turn}: Session): string[] {
  let ends = endStepsForTurnByCommand(turn);
  let fromName = ends.win.length ? 'win' : ends.endturn.length ? 'endturn' : ends.draw.length ? 'draw' : 'lose';
  let targetStepId = ends[fromName][random(0,ends[fromName].length - 1)];
  return turn.steps[targetStepId].path.concat(fromName);
}
