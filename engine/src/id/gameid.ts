// TODO - we should encode games to 2 letters, otherwise we get max cap at 60sth!

// All games must be part of this array, and order must never be changed!
// When you add a new game, add it to the end of the list!
const games = [
  "_test", "amazon", "aries", "atrium", "castle", "coffee", "daggers", "gogol", "jostle", "kickrun", "krieg",
  "murusgallicus", "murusgallicusadvanced", "orthokon", "semaphor", "serauqs", "snijpunt", "transet","threemusketeers",
  "uglyduck","duplo","descent"
];

import ALPHA from '../various/base64chars';

function char2index(char){
  return char ? Math.max(ALPHA.indexOf(char), 0) : 0;
}

function game2num(gameid){
  let num = games.indexOf(gameid);
  if (num === -1){
    throw `Game "${gameid}" is not mentioned in id array!`;
  }
  return num;
}

export function decodeGameId(codeChar, offsetChar){
  let pos = ALPHA.indexOf(codeChar);
  if (pos === -1){
    throw `Faulty gameId codechar ${codeChar}`;
  }
  pos -= char2index(offsetChar);
  let game = games[ pos < 0 ? pos + ALPHA.length : pos ];
  if (!game){
    throw "Failed to get game!";
  }
  return game;
}

export function encodeGameId(gameId, offsetChar){
  let code = ALPHA[ (game2num(gameId) + char2index(offsetChar)) % ALPHA.length ];
  if (code.length !== lengthOfEncodedGameId){
    throw `Tried to encode ${gameId} with offset {offsetChar}, but resulting code "${code}" was wrong length!`;
  }
  return code;
}

export const lengthOfEncodedGameId = 1;