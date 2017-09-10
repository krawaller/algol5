import lib from '../logic/';
import {blankArtifactLayers,generatorLayers} from './utils';
import {Definition} from './types';

export function copyArtifactsForAction(gameDef: Definition, actionDef) {
  let actionlayers = Object.keys((actionDef.runGenerators||[]).concat(actionDef.runGenerator ? [actionDef.runGenerator] : []).reduce((mem,gen)=> {
		let gens = lib.possibilities(gen);
		gens.forEach(gen=>{
			mem = Object.assign(mem,generatorLayers(gameDef.generators[gen]))
		})
		return mem
	},{}));
  let ret = '{'
  ret += actionlayers.map(l=>l+': Object.assign({},step.ARTIFACTS.'+l+')').join(', ')
  ret += '}'
  if (actionlayers.length === Object.keys(blankArtifactLayers(gameDef,true)).length){
      return ret;
  } else {
      return 'Object.assign({},step.ARTIFACTS,'+ret+')'
  }
}


export function calculateUnitLayers(gameDef: Definition, player: 1 | 2, defineVariable: boolean){
  const O = {rules: gameDef, player};
  return `
    ${defineVariable ? 'var ' : ''}UNITLAYERS = ${lib.blankUnitLayers(O)};
    for (var unitid in UNITDATA) {
        var currentunit = UNITDATA[unitid]
        var unitgroup = currentunit.group;
        var unitpos = currentunit.pos;
        var owner = ownernames[currentunit.owner]
        UNITLAYERS.units[unitpos]
            = UNITLAYERS[unitgroup][unitpos]
            = UNITLAYERS[owner + unitgroup][unitpos]
            = UNITLAYERS[owner +'units'][unitpos]
            = currentunit;
    }
  `;
}

/*
: (O)=> `
        ${O && O.defineUnitlayers ? 'var ' : ''}UNITLAYERS = ${C.blankUnitLayers(O)};
        for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos]
                = UNITLAYERS[unitgroup][unitpos]
                = UNITLAYERS[owner + unitgroup][unitpos]
                = UNITLAYERS[owner +'units'][unitpos]
                = currentunit;
        }`,
        */