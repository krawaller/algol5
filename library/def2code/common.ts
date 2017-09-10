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
