import { randomEndTurn } from "../../battle/src/tools/randomEndTurn";
import { AlgolStaticGameAPI } from "../../types";

export const makeFakeBattle = (api: AlgolStaticGameAPI) => {
  let battle = api.newBattle();
  let turns = Math.floor(Math.random() * 20);
  while (!battle.gameEndedBy && turns--) {
    battle = randomEndTurn(api, battle);
  }
  return battle;
};
