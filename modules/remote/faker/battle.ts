import { randomEndTurn } from "../../battle/expose/randomEndTurn";
import { isWaitingForRemote, updateSession } from "../../common";
import { AlgolBattle, AlgolSession } from "../../types";
import { AlgolRemoteBattleAPI } from "../types/api/battle";
import { currentGame } from "./atoms";
import { makeFakeBattle } from "./makeFakeBattle";
import { makeFakeSession } from "./makeFakeSession";

const subs: Record<
  string,
  Parameters<AlgolRemoteBattleAPI["subscribe"]>["0"]["listener"]
> = {};

const fakeContainer = (id: string) => {
  const api = currentGame.getValue()!;
  const me = Math.random() < 0.5 ? 1 : 2;
  const battle = makeFakeBattle(api);
  const session = makeFakeSession({
    api,
    battle,
    id,
    me,
  });
  return { battle, session };
};

const fakeMove = (battle: AlgolBattle, session: AlgolSession) => {
  const api = currentGame.getValue()!;
  const updatedBattle = randomEndTurn(api, battle);
  const updatedSession = updateSession(updatedBattle, session, api.iconMap);
  return { battle: updatedBattle, session: updatedSession };
};

export const fakerBattleAPI: AlgolRemoteBattleAPI = {
  subscribe: opts => {
    subs[opts.sessionId] = opts.listener;
    return () => {
      delete subs[opts.sessionId];
    };
  },
  load: (id: string) =>
    new Promise(resolve => {
      const container = fakeContainer(id);
      setTimeout(() => {
        resolve(container);
        if (isWaitingForRemote(container.session)) {
          setTimeout(() => {
            subs[id]?.(fakeMove(container.battle, container.session));
          }, 2000 + 5000 * Math.random());
        }
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
          subs[opts.session.id]?.(fakeMove(updatedBattle, updatedSession));
        }, 2000 + 5000 * Math.random());
      }, 500 + 2000 * Math.random());
    }),
};
