import { Turn, Step } from '../types';

export default function calcTurnSave(turn: Turn, step: Step, finishCmnd): number[]{
  let id = 'root';
  let remaining = step.path.concat(finishCmnd);
  let save = [];
  while (remaining.length){
    let cmnd = remaining.shift();
    let available = Object.keys( turn.links[id] ).sort();
    if (available.length > 1){
      let index = available.indexOf(cmnd);
      if (index === -1){
        throw "Didnt find action!";
      }
      save.push(index);
    }
    id += '-' + cmnd;
  }
  return save;
}