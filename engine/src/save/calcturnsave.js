export default function calcTurnSave(turn,step,finishCmnd){
  let id = 'root';
  let remaining = step.path.concat(finishCmnd);
  let save = [];
  while (remaining.length){
    let cmnd = remaining.shift();
    let available = Object.keys( turn.links[id] ).sort();
    if (available.length > 1){
      let index = available.indexOf(cmnd);
      if (index === -1){
        throw "Didnt find action!" // TODO - make it work for win/lose/draw
      }
      save.push(index);
    }
    id += '-' + cmnd;
  }
  return save;
}