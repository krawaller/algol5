
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
    ${needLevel(walkDef.steps) === 'start' ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks) === 'start' ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
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
    ${needLevel(walkDef.steps) === 'dir' ? `var allowedsteps = ${lib.set(O,walkDef.steps)};` : ''}
    ${needLevel(walkDef.blocks) === 'dir' ? `var BLOCKS = ${lib.set(O,walkDef.blocks)};` : ''}
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
        ${lib.walkindir({...O, usefordir: dirVar},walkDef)}
      }
    `;
  } else {
    let dirVar = dirMatters ? 'DIR' : lib.value(O,walkDef.dir);
    return intro + `
      ${dirMatters ? `var DIR = ${lib.value(O,walkDef.dir)}; ` : ''}
      ${lib.walkindir({...O, usefordir: dirVar},walkDef)}
    `;
  }
}

function walkInDir(gameDef: Definition, player: 1 | 2, action: string, walkDef, dirVar){
  
}

/*
	// ASSUMES STARTPOS, DIR
	prepwalkstart: (O,def)=> {
		def = def || {}
		let ret =  ''
		if (C.needsWalkPath(O,def)){
			ret += 'var walkedsquares = []; '
		}
		if (C.needsStopreason(O,def)){
			ret += 'var STOPREASON = ""; '
		}
		if (def.max){
			ret += 'var MAX='+C.value(O,def.max)+'; '
		}
		if (def.startasstep){
			ret += 'var POS = "faux"; '
			ret += 'connections.faux[DIR]=STARTPOS; '
		} else {
			ret += 'var POS = STARTPOS; '
		}
		if (def.steps && C.needLevel(O,def.steps) === 'loop'){
			ret += 'var allowedsteps = '+C.set(O,def.steps)+'; '
		}
		if (def.blocks && C.needLevel(O,def.blocks) === 'loop'){
			ret += 'var BLOCKS = '+C.set(O,def.blocks)+'; '
		}
		if (def.count){
			ret += 'var walkpositionstocount = '+C.set(O,def.count)+'; '
			if (C.contains(def.draw,['countsofar'])){
				ret += 'var countedwalkpositions = []; '
			}
			ret += 'var CURRENTCOUNT = 0; '
		}
		return ret;
	},

// wants full walkerdef. 
	// assumes STARTPOS, connections
	walkindir: (O,def)=> {
		let ret = ''
		ret += C.prepwalkstart(O,def)
		if (def.max){
			ret += 'var LENGTH=0; '
		}
		if (O && C.drawDuringWhile(O,def) && C.contains([def.draw.steps,def.draw.all],['step'])){
			ret += 'var STEP=0; '
		}
		if (C.needsStopreason(O,def)){
			ret += 'while(!(STOPREASON='+C.stopreason(O,def)+')){'
		} else {
			ret += 'while('+C.stopcond(O,def)+'){'
		}
		ret += C.takewalkstep(O,def)
		if (def.max)
			ret += 'LENGTH++; '
		if (C.drawDuringWhile(O,def)){
			ret += C.drawwalksinglestep(O,def)
		}
		ret += '}'
		ret += C.afterwalk(O,def)
		ret += C.drawwalkblock(O,def)
		ret += C.drawwalkstart(O,def)
		if (!C.drawDuringWhile(O,def)){
			ret += C.drawwalksteps(O,def)
		}
		ret += C.drawwalklast(O,def)
		return ret;
	},
*/




// when do we need it? :D
function needLevel(expr){
  return contains(expr,['dir']) ? 'loop' : contains(expr,['start']) ? 'dir' : expr ? 'start' : '';
}
