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
  const desc = `Overview and handling of this ${
    session.endedBy ? "finished" : "ongoing"
  } session`;
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
