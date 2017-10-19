/*
WIP?
Returns array of UI objects for given turn, with adjusted marks
*/

import getStepUI from '../ui/getstepui';
import {pos2coords} from '../../gamesproxy';
import { Session, Turn, StepUI } from '../types';

export default function seedHistory(newSession: Session): StepUI {
  let UI = getStepUI(newSession, newSession.step);
  UI.description = 'start';
  UI.playing = 0;
  UI.turn = 0;
  UI.idx = 0;
  UI.stepIdx = 1;
  UI.maxStepIdx = 1;
  return UI;
}
