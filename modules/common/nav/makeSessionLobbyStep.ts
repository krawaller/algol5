import { AlgolLocalBattle, BattleNavActions, AlgolNavStep } from "../../types";
import { makeSessionControlsStep } from "./makeSessionControlsStep";
import { makeSessionHistoryStep } from "./makeSessionHistoryStep";

type MakeSessionLobbyStepOpts = {
  session: AlgolLocalBattle;
  battleNavActions: BattleNavActions;
};

export const makeSessionLobbyStep = (
  opts: MakeSessionLobbyStepOpts
): AlgolNavStep => {
  const { battleNavActions, session } = opts;
  const desc =
    session.turn === 1 && session.player === 1
      ? `The battle has just begun!`
      : session.endedBy
      ? `Finished ${session.turn} turn battle, ${
          session.player ? `plr${session.player} won` : "ended in draw"
        }`
      : `Ongoing battle, turn ${session.turn}, plr${session.player} to play`;

  return {
    title: `Session ${session.id}`,
    desc,
    onClick: battleNavActions.toBattleLobby,
    links: [
      makeSessionControlsStep(battleNavActions),
      makeSessionHistoryStep(battleNavActions),
    ],
  };
};
