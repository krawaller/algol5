import * as isObject from 'lodash/isObject';
import * as isArray from 'lodash/isArray';
import * as isEqual from 'lodash/isEqual';
import * as some from 'lodash/some';
import * as reduce from 'lodash/reduce';
import * as invert from 'lodash/invert';
import * as uniq from 'lodash/uniq';

import lib from '../logic/';

import {Definition} from './types';


// only used in blankUnitLayers, but needs to be its own function since it is recursive
export function deduceDynamicGroups(rules: any){
  return uniq(
		rules[0] === "spawn" ? possibilities(rules[2])
		: {setat:1,setid:1,setin:1}[rules[0]] && contains(possibilities(rules[2]),'group') ? possibilities(rules[3])
		: isArray(rules) || isObject(rules) ? reduce(rules,(mem,def)=>mem.concat(deduceDynamicGroups(def)),[])
		: []
	).sort();
}

export function blankUnitLayers(gameDef: Definition){
  return reduce(
    Object.keys(gameDef.setup || {}).concat(deduceDynamicGroups(gameDef.commands || {})).concat('units'),
    (mem,g)=>({ ...mem, [g]: {}, ['my'+g]: {}, ['opp'+g]: {}, ['neutral'+g]: {} }),
    {}
  );
}

export function ifCodeContains(code: string, lines: {[needle: string]: string}) {
  return Object.keys(lines).reduce((mem,needle) => code.match(needle) ? mem + ' ' + lines[needle] : mem, '');
}

export function getTerrain(gameDef: Definition) {
  return Object.assign({},
    gameDef && gameDef.board && gameDef.board.terrain || {},
    gameDef && gameDef.AI && gameDef.AI.terrain || {}
  );
}

  /*
  Calculates all layers used by a generator
  */
export function generatorLayers(gendef){
  return reduce(gendef.tolayer ? {foo:gendef} : gendef.draw,(mem2,drawdef)=> {
    return reduce(possibilities(drawdef.tolayer),(mem3,l)=> {
      const list = drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : [l]
      return reduce(list, (mem4,l)=> ({...mem4, [l]:{} }), mem3)
    },mem2)
  },{});
}

export function blankArtifactLayers(gameDef: Definition) {
  return reduce(gameDef.generators,(mem,genDef,key)=>{
    return Object.assign(mem,generatorLayers(genDef));
  },{});
}

export function isTerrainNeutral(gameDef: Definition) {
  return !(
    Object.keys(getTerrain(gameDef)).filter(t=> t[1] || t[2]).length
  );
}

export function contains(haystack,needle): boolean {
  if (isEqual(needle,haystack)){
    return true;
  } else if (isArray(haystack) || isObject(haystack)){
    return some(haystack,child=> contains(child,needle));
  } else {
    return false;
  }
}

export function usesTurnVars(search: Definition | any): boolean {
  return contains(search,'turnvar') || contains(search,'turnpos') || contains(search,'setturnvar') || contains(search,'setturnpos');
}


const colnametonumber = reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
	mem[char] = n+1;
	return mem;
},{});

const colnumbertoname = invert(colnametonumber);

export function pos2coords(pos) {
  return {
		x: colnametonumber[pos[0]],
		y: parseInt(pos.substr(1))
	}
}

export function coords2pos(coords){
  return colnumbertoname[coords.x]+coords.y;
}

export function	possibilities(def){
	return def[0] === 'ifelse' ? possibilities(def[2]).concat(possibilities(def[3]))
		: def[0] === 'playercase' ? possibilities(def[1]).concat(possibilities(def[2]))
		: def[0] === 'if' ? possibilities(def[2])
		: def[0] === 'ifplayer' ? possibilities(def[2])
		: def[0] === 'indexlist' ? def[2]
		: [def];
}
