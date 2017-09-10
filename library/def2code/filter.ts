import * as map from 'lodash/map';

import lib from '../logic/';
import { Definition } from './types';

export default function executeFilter(gameDef: Definition, player: 1 | 2, action: string, filterDef: any){
  const O = {rules: gameDef, player, action};
  const toLayerDependsOnTarget = lib.contains(filterDef.tolayer, 'target');
  const assignTargetLayerVar = `var filtertargetlayer = ${lib.layerref(O, filterDef.tolayer)};`;
  const condition = (filterDef.condition ? [lib.boolean(O,filterDef.condition)] : []).concat(
    map(filterDef.matching,(test,key)=> lib.prop(O,test,key) )
  ).join(' && ');
  return `
    var filtersourcelayer = ${lib.layerref(O, filterDef.layer)};
    ${!toLayerDependsOnTarget ? assignTargetLayerVar : ''}
    for (var POS in filtersourcelayer){
      ${toLayerDependsOnTarget ? assignTargetLayerVar : ''}
      if (filtersourcelayer[POS]){
        var filterobj = filtersourcelayer[POS];
        if (${condition}){
          filtertargetlayer[POS] = filterobj;
        }
      }
    }
  `;
}
/*

	addtolayerbyref: (O,layerref,pos,obj)=> layerref+'['+pos+']='+obj+'; ',


	// assumes POS, filterobj, filtertargetlayername
	filterobject: (O,def)=> { // TODO - core datatype for matcher?
		let ret = ''
		let conds = (def.condition ? [C.boolean(O,def.condition)] : [])
		conds = conds.concat(map(def.matching,(test,key)=> C.prop(O,test,key) ))
		ret += 'if (' + conds.join(' && ') + '){'
		ret += C.addtolayerbyref(O,'filtertargetlayer','POS','filterobj');
		//ret += C.addtolayer(O,'filtertargetlayername','POS','filterobj')
		ret += '} '
		return ret
	}

	// assumes filtersourcelayer, POS,
	filterposition: (O,def)=> {
		let ret = ''
		if (C.contains(def.tolayer,'target')){
			ret += 'var filtertargetlayer = '+C.layerref(O,def.tolayer)+'; '
		}
		ret += 'if (filtersourcelayer[POS]){'
		ret += 'var filterobj = filtersourcelayer[POS]; '
		ret += C.filterobject(O,def)
		ret += '} '
		return ret
	},

	applyfilter: (O,def)=> {
		let ret = ''
		ret += 'var filtersourcelayer = '+C.layerref(O,def.layer)+'; '
		if (!C.contains(def.tolayer,'target')){
			ret += 'var filtertargetlayer = '+C.layerref(O,def.tolayer)+'; '
		}
		ret += 'for (var POS in filtersourcelayer){'
		ret += C.filterposition(O,def)
		ret += '}'
		return ret
	},

*/