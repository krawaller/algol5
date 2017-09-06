
import lib from '../logic/';

import { Definition } from './types';
import addMarkFunc from './mark';
import addCommandFunc from './command';
import addStartFunc from './start';

export default function playerClosure(def: Definition, player: 1 | 2){
  const O = { rules: def, player };
  return `
    (function(){
      ${lib.isTerrainNeutral(O) ? '' : `var TERRAIN = terrainLayers(boardDef, ${player}${def.AI && def.AI.terrain ? `, ${JSON.stringify(def.AI.terrain)}` : ''}); `}
      var ownernames = ${player === 2 ? '["neutral","opp","my"]' : '["neutral","my","opp"]'};
      var player = ${player};
      var otherplayer = ${player === 1 ? 2 : 1};
      ${lib.addAllScoringsForPlayer(O)}
      ${Object.keys(def.marks||{}).map(
        markname => addMarkFunc(def, markname, player)
      ).join(' ')}
      ${Object.keys(def.commands||{}).map(
        cmndname => addCommandFunc(def, cmndname, player)
      ).join(' ')}
      ${addStartFunc(def, player)}
      ${lib.addAI(O)}
      game.debug${player} = function(){
        return {TERRAIN:TERRAIN};
      }
    })();
  `
}