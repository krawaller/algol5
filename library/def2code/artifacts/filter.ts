import * as map from 'lodash/map';

import lib from '../../logic/';
import { Definition } from '../types';
import { contains } from '../utils';
import makeParse from '../expressions';

export default function executeFilter(gameDef: Definition, player: 1 | 2, action: string, filterDef: any){
	const parse = makeParse(gameDef, player, action);
  const toLayerDependsOnTarget = contains(filterDef.tolayer, 'target');
  const assignTargetLayerVar = `var filtertargetlayer = ${parse.layerRef(filterDef.tolayer)};`;
  const condition = (filterDef.condition ? [parse.bool(filterDef.condition)] : []).concat(
    map(filterDef.matching,(test,key)=> {
      switch(test[0]){
        case "is": return `filterobj.${key} === ${parse.value(test[1])}`;
        case "isnt": return `filterobj.${key} !== ${parse.value(test[1])}`;
        default: throw "Unknown prop test def: " + test;
      }
    })
  ).join(' && ');
  return `
    var filtersourcelayer = ${parse.layerRef(filterDef.layer)};
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
