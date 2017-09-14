
import { Definition } from '../types';
import lib from '../../logic/';
import { contains, listlength } from '../utils';
import draw from './draw';

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
    const predictedNbrOfDirs = listlength(walkDef.dirs);
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
  const drawStepsInLoop = drawDuringWhile && contains([walkDef.draw.steps,walkDef.draw.all,walkDef.draw.counted],['step']);
  const needsStopReason = walkDef.draw.blocks || contains(walkDef,['stopreason']);
  const needsWalkLength = walkDef.draw.last || contains(walkDef.draw,['walklength']);
  const needsWalkPath = !drawDuringWhile || needsWalkLength;
  const whileCondition = needsStopReason ? `!(STOPREASON=${lib.stopreason(O,walkDef)})` : lib.stopcond(O,walkDef);
  const countSoFar = walkDef.count && contains(walkDef.draw,['countsofar']);
  const drawBlockCond = ['BLOCKS[POS]'].concat(walkDef.steps && !walkDef.testblocksbeforesteps ? 'allowedsteps[POS]' : []).join(' && ');
  const shouldDrawStart = walkDef.draw.start || walkDef.draw.all;
  const startNeedsPosVar = contains([walkDef.draw.start,walkDef.draw.all],['target']);
  const drawWalkAfterLoop = !drawDuringWhile && walkDef.draw.steps || walkDef.draw.all || walkDef.draw.counted;
  const needStepsAfterLoop = drawWalkAfterLoop && contains([walkDef.draw.steps,walkDef.draw.all,walkDef.draw.counted],['step']);
  const lastNeedsStep = contains(walkDef.draw.last, ['step']);
  const lastNeedsPos = contains(walkDef.draw.last, ['target']);
  return `
    ${needsWalkPath                    ? 'var walkedsquares = [];                                                    ' :''}
    ${needsStopReason                  ? 'var STOPREASON = "";                                                       ' : ''}
    ${walkDef.max                      ? `var MAX = ${lib.value(O,walkDef.max)};                                     ` : ''}
    ${walkDef.startasstep              ? 'var POS = "faux";                                                          ' : ''}
    ${walkDef.startasstep              ? 'connections.faux[DIR]=STARTPOS;                                            ' : ''}
    ${!walkDef.startasstep             ? 'var POS = STARTPOS;' : ''}
    ${needLevel(walkDef.steps,'loop')  ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks,'loop') ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
    ${walkDef.count                    ? `var walkpositionstocount = ${lib.set(O,walkDef.count)};` : ''}
    ${walkDef.count                    ? `var CURRENTCOUNT = 0;` : ''}
    ${countSoFar                       ? `var countedwalkpositions = [];` : ''}
    ${walkDef.max                      ? `var LENGTH = 0;` : ''}
    ${drawStepsInLoop               ? `var STEP = 0;` : ''}
                                          while(${ whileCondition }){
    ${needsWalkPath                    ? '  walkedsquares.push(POS);' : ''}
    ${countSoFar                       ? '  countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0));' : ''}
    ${walkDef.count && !countSoFar     ? '  CURRENTCOUNT+=(walkpositionstocount[POS]?1:0); ' : ''}
    ${walkDef.max                      ? `  LENGTH++;` : ''}
    ${drawDuringWhile ? `
        ${drawStepsInLoop           ? '  STEP++;' : ''}
        ${walkDef.count && countSoFar  ? '  CURRENTCOUNT = countedwalkpositions[walkstepper];' : ''}
                                            ${draw(gameDef,player,action,walkDef.draw.steps)}
                                            ${draw(gameDef,player,action,walkDef.draw.all)}
        ${walkDef.draw.counted         ? `  if (walkpositionstocount[POS]){
                                              ${draw(gameDef,player,action,walkDef.draw.counted)}
                                            }` : ''}
    ` : ''}
                                          }
    ${needsWalkLength                  ? 'var WALKLENGTH = walkedsquares.length; ' : ''}
    ${walkDef.count                    ? 'var TOTALCOUNT = CURRENTCOUNT; ' : ''}
    ${walkDef.draw.block               ? `if (${drawBlockCond}){
                                            ${draw(gameDef,player,action,walkDef.draw.block)}
                                            ${draw(gameDef,player,action,walkDef.draw.all)}
                                          }
    ` : ''}
    ${shouldDrawStart                  ? `
       ${startNeedsPosVar              ? 'POS = STARTPOS;' : ''}
                                          ${draw(gameDef,player,action,walkDef.draw.start, startNeedsPosVar ? 'POS' : 'STARTPOS')}
                                          ${draw(gameDef,player,action,walkDef.draw.all, startNeedsPosVar ? 'POS' : 'STARTPOS')}
    ` : ''}
    ${drawWalkAfterLoop                ? `
      ${needStepsAfterLoop             ? 'var STEP = 0; ' : '' }
                                          for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){
                                            POS=walkedsquares[walkstepper];
      ${needStepsAfterLoop             ? '  STEP++;' : ''}
      ${countSoFar                     ? '  CURRENTCOUNT = countedwalkpositions[walkstepper];' : ''}
                                            ${draw(gameDef,player,action,walkDef.draw.steps)}
                                            ${draw(gameDef,player,action,walkDef.draw.all)}
      ${walkDef.draw.counted           ? `
                                            if (walkpositionstocount[POS]){
                                              ${draw(gameDef,player,action,walkDef.draw.counted)}
                                            }
      ` : ''}
                                          }
    ` : ''}
    ${walkDef.draw.last                ? `
                                          if (WALKLENGTH){
      ${lastNeedsStep                  ? '  STEP = WALKLENGTH;' : ''}
      ${lastNeedsPos                   ? '  POS = walkedsquares[WALKLENGTH-1];' : ''}
                                            ${draw(gameDef,player,action,walkDef.draw.last,lastNeedsPos ? 'POS' : 'walkedsquares[WALKLENGTH-1]')}
                                          }
    ` : ''}
  `;
}


// when do we need it? :D
function needLevel(expr, when){
  return (contains(expr,['dir']) ? 'loop' : contains(expr,['start']) ? 'dir' : expr ? 'start' : '') === when;
}



 // OLD TODO from drawwalkstart - handle all + startasstep?