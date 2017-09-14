import * as map from 'lodash/map';

import makeExpr from '../expressions';
import { Definition } from '../types';
import obey from '../obey';
import applyGenerators from '../artifacts/generate';

// TODO: Add action! 

function addLink(gameDef: Definition, name: string, player: 1 | 2, root: boolean){
  const expr = makeExpr(gameDef, player, "ADD ACTION HERE OMG");
  if (gameDef && gameDef.commands && gameDef.commands[name]){
    return `
      turn.links${root ? '.root' : '[newstepid]'}.${name} = '${name+player}';
    `;
  } else if (gameDef && gameDef.marks && gameDef.marks[name]){
    const markDef = gameDef.marks[name];
    return `
      var newlinks = turn.links${root ? '.root' : '[newstepid]'};
      for(var linkpos in ${expr.set(markDef.from)}){
          newlinks[linkpos] = '${name+player}';
      }
    `;
  } else if (name === "endturn"){
    const endTurnDef = gameDef.endTurn || {};
    let ret = applyGenerators(gameDef, endTurnDef, player, "endturn");
    //let ret = lib.applyGeneratorInstructions({...(O || {}), generating:true},endTurnDef || {})
    return ret + map(endTurnDef.unless,(cond,name)=> {
      return 'if ('+expr.bool(cond)+'){ turn.blockedby = "'+name+'"; } '
    }).concat(map(gameDef.endGame,(def,name)=> `
      if (${expr.bool(def.condition)}) { 
        var winner = ${expr.value(def.who||player)};
        var result = winner === ${player} ? 'win' : winner ? 'lose' : 'draw';
        turn.links[newstepid][result] = '${name}';
      }`
    )).concat('turn.links[newstepid].endturn = "start"+otherplayer; ').join(' else ')
  } else {
    throw "Unknown link: "+name
  }
}

export default function applyLinkInstructions(gameDef: Definition, actionDef: any, player: 1 | 2, root: boolean){
  if (actionDef.links){
    return obey(gameDef, player, ['all'].concat(actionDef.links), (link) => addLink(gameDef, link, player, root));
  } else {
    return obey(gameDef, player, actionDef.link, (link) => addLink(gameDef, link, player, root));
  }
}
