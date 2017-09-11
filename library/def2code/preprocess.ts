/*
Used in the `generate.js` build script to preprocess individual
game definitions.

TODO
 - add id to metadata
 - add AI list to metadata (or have it already there with desc?)
*/

import { Definition } from './types';
import * as fs from 'fs';
import { possibilities } from './utils';

  // Flow information right now used in logic building (flow_mark.js)
function mapFlow(game: Definition) {
  let actions = [{name:'start',def:game.startTurn,type:'start',path:[]}]
  while(actions.length){
    let {name,def,type,path} = actions.shift();
    (def.link ? [def.link] : []).concat(def.links || []).reduce((mem,l)=>mem.concat(possibilities(l)),[]).filter(l=>l!=='endturn').forEach(targetName=>{
      let targetType = game.marks[targetName] ? 'mark' : 'command'
      let targetDef = game[targetType+'s'][targetName]
      if (targetDef.flow){
        targetDef.flow = 'cyclic'
      } else {
        targetDef.flow = path.concat({name,type})
        actions.push({
          name: targetName,
          type: targetType,
          def: targetDef,
          path: path.concat({name,type})
        })
      }
    })
  }
  game.flow = actions;
  return game;
}

export default function preProcess(def: Definition){
  return mapFlow(def);
}