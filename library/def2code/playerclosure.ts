
import lib from '../logic/';

import { Definition } from './types';
import makeMarkFunc from './mark';

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
        markname => makeMarkFunc(def, markname, player)
      ).join(' ')}
      ${lib.addAllCommandFunctions(O)}
      ${lib.addStartTurnFunction(O)}
      ${lib.addAI(O)}
      game.debug${player} = function(){
        return {TERRAIN:TERRAIN};
      }
    })();
  `
}