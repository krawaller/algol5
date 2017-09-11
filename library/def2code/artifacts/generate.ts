import lib from '../../logic/';

import { Definition } from '../types';
import executeFilter from './filter';
import obey from '../obey';

export function executeGenerator(gameDef: Definition, player: 1 | 2, action: string, genDef: any){
  const O = {rules: gameDef, player, action};
  switch(genDef.type){
    case 'walker': return lib.applywalker(O,genDef);
    case 'neighbour': return lib.applyneighbours(O,genDef);
    case 'filter': return executeFilter(gameDef, player, action, genDef); //lib.applyfilter(O,genDef);
    default: throw 'Unknown generator def: '+genDef;
  }
}

export default function applyGenerators(gameDef: Definition, actionDef: any, player: 1 | 2, action: string){
  if (actionDef.runGenerators){
    return obey(gameDef, player, ['all'].concat(actionDef.runGenerators), (generator) => executeGenerator(gameDef, player, action, gameDef.generators[generator]));
  } else if (actionDef.runGenerator){
    return obey(gameDef, player, actionDef.runGenerator, (generator) => executeGenerator(gameDef, player, action, gameDef.generators[generator]));
  } else {
    return '';
  }
}
