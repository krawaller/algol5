/*
Return a sorted array with all commands available in the UI at this time
*/
export function optionsInUI(UI){
  return UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo')).sort();
}

export function isTurnEndCommand(cmnd){
  return !!{
    endturn: 1,
    win: 1,
    lose: 1,
    draw: 1
  }[cmnd];
}

export function calcTurnSave(turn,step,finishCmnd){
  let id = 'root';
  let remaining = step.path.concat(finishCmnd);
  let save = [];
  console.log('BEGINNING');
  while (remaining.length){
    let cmnd = remaining.shift();
    console.log('Am at',id,'gonna perform',cmnd, 'available', turn.links[id] ,'all links', turn.links);
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
  console.log('END', save);
  return save;
}
