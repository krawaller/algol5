
import { Definition } from '../types';
import lib from '../../logic/';
import { contains } from '../utils';

/*
draw directly in whileloop if:
def.draw.steps and def.draw.all doesn't contain walklength or totalcount
*/

export default function executeWalker(gameDef: Definition, player: 1 | 2, action: string, walkDef){
  const O = {rules: gameDef, player, action};
  const intro = `
    ${needLevel(walkDef.steps,'start') ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks,'start') ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
  `;
  if (walkDef.starts){
    return intro + `
      var walkstarts = ${lib.set(O,walkDef.starts)};
      for(var STARTPOS in walkstarts) {
        ${walkFromStart(gameDef, player, action, walkDef)}
      }
    `;
  } else {
    return intro + `
      var STARTPOS = ${lib.position(O,walkDef.start)};
      ${walkFromStart(gameDef, player, action, walkDef)}
    `;
  }
}

function walkFromStart(gameDef: Definition, player: 1 | 2, action: string, walkDef){
  const dirMatters = contains(walkDef.draw, ['dir']) || walkDef.startasstep; // because startasstep accesses faux with DIR
  let O:any = {rules: gameDef, player, action};
  const intro = `
    ${needLevel(walkDef.steps,'dir') ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks,'dir') ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
  `;
  if (walkDef.dirs){
    let dirVar = dirMatters ? 'DIR' : 'allwalkerdirs[walkerdirnbr]';
    const predictedNbrOfDirs = lib.listlength(walkDef.dirs);
    let nbrOfDirs = predictedNbrOfDirs || 'nbrofwalkerdirs';
    return intro + `
      var allwalkerdirs = ${lib.list(O,walkDef.dirs)};
      ${!predictedNbrOfDirs ? 'var nbrofwalkerdirs=allwalkerdirs.length; ' : ''}
      for(var walkerdirnbr=0; walkerdirnbr<${nbrOfDirs}; walkerdirnbr++){
        ${dirMatters ? 'var DIR = allwalkerdirs[walkerdirnbr]; ' : ''}
        ${walkInDir(gameDef,player,action,walkDef,dirVar)}
      }
    `;
  } else {
    let dirVar = dirMatters ? 'DIR' : lib.value(O,walkDef.dir);
    return intro + `
      ${dirMatters ? `var DIR = ${lib.value(O,walkDef.dir)}; ` : ''}
      ${walkInDir(gameDef,player,action,walkDef,dirVar)}
    `;
  }
}


// TODO - totalcount might not always be needed
function walkInDir(gameDef: Definition, player: 1 | 2, action: string, walkDef, dirVar){
  const O = {rules: gameDef, player, action, usefordir: dirVar};
  const drawDuringWhile = !contains([walkDef.draw.steps,walkDef.draw.all],['totalcount']) && !contains([walkDef.draw.steps,walkDef.draw.all],['walklength']);
  const drawingStepsNow = drawDuringWhile && contains([walkDef.draw.steps,walkDef.draw.all],['step']);
  const needsStopReason =  walkDef.draw.blocks || contains(walkDef,['stopreason']);
  const needsWalkLength = walkDef.draw.last || contains(walkDef.draw,['walklength']);
  const needsWalkPath = !drawDuringWhile || needsWalkLength;
  const whileCondition = needsStopReason ? `!(STOPREASON=${lib.stopreason(O,walkDef)})` : lib.stopcond(O,walkDef);
  const countSoFar = walkDef.count && contains(walkDef.draw,['countsofar']);
  return `
    ${needsWalkPath ? 'var walkedsquares = []; ' :''}
    ${needsStopReason ? 'var STOPREASON = "";' : ''}
    ${walkDef.max ? `var MAX = ${lib.value(O,walkDef.max)};` : ''}
    ${walkDef.startasstep ? 'var POS = "faux";' : ''}
    ${walkDef.startasstep ? 'connections.faux[DIR]=STARTPOS;' : ''}
    ${!walkDef.startasstep ? 'var POS = STARTPOS;' : ''}
    ${needLevel(walkDef.steps,'loop') ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks,'loop') ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
    ${walkDef.count ? `var walkpositionstocount = ${lib.set(O,walkDef.count)};` : ''}
    ${walkDef.count ? `var CURRENTCOUNT = 0;` : ''}
    ${countSoFar ? `var countedwalkpositions = [];` : ''}
    
    ${walkDef.max ? `var LENGTH = 0;` : ''}
    ${drawingStepsNow ? `var STEP = 0;` : ''}
    
    while(${ whileCondition }){
      ${needsWalkPath ? 'walkedsquares.push(POS);' : ''}
      ${countSoFar ? 'countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0));' : ''}
      ${walkDef.count && !countSoFar ? 'CURRENTCOUNT+=(walkpositionstocount[POS]?1:0); ' : ''}
      ${walkDef.max ? `LENGTH++;` : ''}
      ${drawDuringWhile ? lib.drawwalksinglestep(O,walkDef) : ''}
    }

    ${needsWalkLength ? 'var WALKLENGTH = walkedsquares.length; ' : ''}
    ${walkDef.count ? 'var TOTALCOUNT = CURRENTCOUNT; ' : ''}

    ${lib.drawwalkblock(O,walkDef)}
    ${lib.drawwalkstart(O,walkDef)}
    ${!drawDuringWhile ? lib.drawwalksteps(O,walkDef) : ''}
    ${lib.drawwalklast(O,walkDef)}
  `;
}

// when do we need it? :D
function needLevel(expr, when){
  return (contains(expr,['dir']) ? 'loop' : contains(expr,['start']) ? 'dir' : expr ? 'start' : '') === when;
}
