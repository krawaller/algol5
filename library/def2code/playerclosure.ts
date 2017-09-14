
import { isTerrainNeutral } from './utils';
import { Definition } from './types';
import addMarkFunc from './actions/mark';
import addCommandFunc from './actions/command';
import addStartFunc from './actions/start';
import addAI from './ai';

export default function playerClosure(def: Definition, player: 1 | 2){
  return `
    (function(){
      ${isTerrainNeutral(def) ? '' : `var TERRAIN = terrainLayers(boardDef, ${player}${def.AI && def.AI.terrain ? `, ${JSON.stringify(def.AI.terrain)}` : ''}); `}
      var ownernames = ${player === 2 ? '["neutral","opp","my"]' : '["neutral","my","opp"]'};
      var player = ${player};
      var otherplayer = ${player === 1 ? 2 : 1};
      ${addAI(def, player)}
      ${Object.keys(def.marks||{}).map(
        markname => addMarkFunc(def, markname, player)
      ).join(' ')}
      ${Object.keys(def.commands||{}).map(
        cmndname => addCommandFunc(def, player, cmndname)
      ).join(' ')}
      ${addStartFunc(def, player)}
      game.debug${player} = function(){
        return {TERRAIN:TERRAIN};
      }
    })();
  `
}