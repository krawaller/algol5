import { AlgolSession, AlgolStaticGameAPI } from "../../types";

export const session2battle = (
  session: AlgolSession,
  api: AlgolStaticGameAPI
) =>
  api.fromSave({
    ended: Boolean(session.endedBy),
    player: session.player,
    turn: session.turn,
    path: session.path,
    variantCode: session.variantCode,
  });
