/*
Should return an encoded sessionSave
*/
export default function encodeSessionSave(turnNumber, save){
  return [turnNumber, save];
}