import ALPHA from '../various/base64chars';

export const lengthOfEncodedBattleId = 4;

export function generateBattleId(){
  let id = '';
  for(let i=0; i<lengthOfEncodedBattleId; i++){
    id += ALPHA[Math.floor(Math.random()*ALPHA.length)];
  }
  return id;
};