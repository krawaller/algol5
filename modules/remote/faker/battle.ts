import { randomEndTurn } from "../../battle/expose/randomEndTurn";
import { updateSession } from "../../common";
import { AlgolRemoteBattleAPI } from "../types/api/battle";
import { currentGame } from "./atoms";
import { makeFakeBattle } from "./makeFakeBattle";
import { makeFakeSession } from "./makeFakeSession";

export const fakerBattleAPI: AlgolRemoteBattleAPI = {
  load: (id: string) =>
    new Promise(resolve => {
      const api = currentGame.getValue()!;
      setTimeout(() => {
        const battle = makeFakeBattle(api);
        const session = makeFakeSession({
          api,
          battle,
          id,
          me: Math.random() < 0.5 ? 1 : 2,
        });
        resolve({ battle, session });
      }, 500 + 2000 * Math.random());
    }),
  endTurn: opts =>
    new Promise(resolve => {
      const { battle, session } = opts;
      const api = currentGame.getValue()!;
      setTimeout(() => {
        const updatedBattle = randomEndTurn(api, battle);
        const updatedSession = updateSession(
          updatedBattle,
          session,
          api.iconMap
        );
        resolve({
          battle: updatedBattle,
          session: updatedSession,
        });
      }, 500 + 2000 * Math.random());
    }),
};
