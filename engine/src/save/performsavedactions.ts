
import decodeSessionSave from './decodesessionsave';
import makePlayer from '../../test/makeplayer';
import optionsInUI from '../various/optionsinui';

import { BattleUI, SaveData } from '../types';

import api from '../.';

export default function performSavedActions(UI: BattleUI, saveData: SaveData): BattleUI {
  let {gameId, battleId, turnNumber, moveIndexes, ended} = saveData // decodeSessionSave(saveString);
  //let UI = api.startGame(gameId,makePlayer(1),makePlayer(2),battleId); // TODO - make save handle player info! :P
  while(UI.current.UI.turn < turnNumber || UI.current.UI.turn == turnNumber && ended && !UI.endedBy){
    let action, available = optionsInUI(UI);
    if (available.length === 1){
      action = available[0]
    } else if (available.length > 1){
      if (!moveIndexes.length){
        throw "Many available but no save index left!"
      } else if (!available[moveIndexes[0]]){
        throw "Index didnt refer to action!";
      }
      action = available[moveIndexes.shift()]
    } else {
      throw "No available actions!"
    }
    UI = api.performAction(UI.sessionId, action);
  }
  if (moveIndexes.length){
    console.log(moveIndexes)
    throw "Oh noes, we had indexes still to go :("
  }
  return UI;
}