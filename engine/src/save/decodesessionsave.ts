import { inflate } from '../../lib/array-compress';

import * as LZ from 'lz-string';

import {lengthOfEncodedGameId, decodeGameId } from '../id/gameid';
import {lengthOfEncodedBattleId} from '../id/battleid';

import { SaveData } from '../types';

//import stringcompr from 'js-string-compression';
//let hm = new stringcompr.Hauffman();

//import cc from 'classical-cipher';

function decodeString(str){
  //return str; 
  return LZ.decompressFromBase64(str);
  //return hm.decompress(str);
  //return cc.ciphers.hillCipher.decrypt(str,[ 2, 7, 15, 4 ]);
}

/*
Should return {gameId, turnNumber, moveIndexes};
*/
export default function decodeSessionSave(garble: string): SaveData {
  const garbledGameId = garble.substr(0,lengthOfEncodedGameId);
  const battleId = garble.substr(lengthOfEncodedGameId,lengthOfEncodedBattleId);
  const [turnNumber, ...moveIndexes] = inflate( decodeString( garble.substr(lengthOfEncodedGameId + lengthOfEncodedBattleId) ) );
  return {
    gameId: decodeGameId(garbledGameId, garble.substr(lengthOfEncodedGameId,1)),
    battleId,
    turnNumber: Math.abs(turnNumber),
    moveIndexes,
    ended: turnNumber < 0
  };
}
