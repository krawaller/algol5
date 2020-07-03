import { AlgolLocalBattle, BattleNavActions, AlgolNavStep } from "../../types";
import { makeSessionControlsStep } from "./makeSessionControlsStep";
import { makeSessionHistoryStep } from "./makeSessionHistoryStep";

type MakeSessionLobbyStepOpts = {
  session: AlgolLocalBattle;
  gameId: string;
  battleNavActions: BattleNavActions;
};

export const makeSessionLobbyStep = (
  opts: MakeSessionLobbyStepOpts
): AlgolNavStep => {
  const { battleNavActions, session, gameId } = opts;
  const desc = `Overview and handling of this ${
    session.endedBy ? "finished" : "ongoing"
  } session`;
  return {
    id: `game-${gameId}-session-${session.id}-history`,
    title: `Session ${session.id}`,
    desc,
    onClick: battleNavActions.toBattleLobby,
    links: [
      makeSessionControlsStep({
        battleNavActions,
        gameId,
        sessionId: session.id,
      }),
      makeSessionHistoryStep({
        battleNavActions,
        gameId,
        sessionId: session.id,
      }),
    ],
  };
};
