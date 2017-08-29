import { compress } from 'array-compress';
import { encodeGameId } from '../id/gameid';

import LZ from 'lz-string';

//import cc from 'classical-cipher';

//import stringcompr from 'js-string-compression';
//let hm = new stringcompr.Hauffman();

function compressString(str){
  //return str;
  return LZ.compressToBase64(str);
  // return hm.compress(str);
  //return cc.ciphers.hillCipher.encrypt(str, [ 2, 7, 15, 4 ]);
}

/*
Should return an encoded sessionSave
*/
export default function encodeSessionSave({gameId, turnNumber, moveIndexes, battleId}){
  return encodeGameId(gameId, battleId[0]) + battleId + compressString( compress([turnNumber, ...moveIndexes]) );
}
