import { randomEndTurn } from "../../battle/expose/randomEndTurn";
import { updateSession } from "../../common";
import { AlgolRemoteBattleAPI } from "../types/api/battle";
import { currentGame } from "./atoms";
import { makeFakeBattle } from "./makeFakeBattle";
import { makeFakeSession } from "./makeFakeSession";

const subs: Record<
  string,
  Parameters<AlgolRemoteBattleAPI["subscribe"]>["0"]["listener"]
> = {};

export const fakerBattleAPI: AlgolRemoteBattleAPI = {
  subscribe: opts => {
    subs[opts.sessionId] = opts.listener;
    return () => {
      delete subs[opts.sessionId];
    };
  },
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
        const updatedBattle = api.performAction(battle, "endTurn");
        const updatedSession = updateSession(
          updatedBattle,
          session,
          api.iconMap
        );
        resolve({
          battle: updatedBattle,
          session: updatedSession,
        });
        setTimeout(() => {
          const randomBattle = randomEndTurn(api, updatedBattle);
          const randomSession = updateSession(
            randomBattle,
            updatedSession,
            api.iconMap
          );
          subs[opts.session.id]?.({
            battle: randomBattle,
            session: randomSession,
          });
        }, 2000 + 5000 * Math.random());
      }, 500 + 2000 * Math.random());
    }),
};
