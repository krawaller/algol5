
import { Definition } from '../types';
import executeFilter from './filter';
import executeNeighbours from './neighbours';
import executeWalker from './walker';
import obey from '../obey';

export function executeGenerator(gameDef: Definition, player: 1 | 2, action: string, genDef: any){
  switch(genDef.type){
    case 'walker': return executeWalker(gameDef, player, action, genDef);
    case 'neighbour': return executeNeighbours(gameDef, player, action, genDef);
    case 'filter': return executeFilter(gameDef, player, action, genDef);
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
