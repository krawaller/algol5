import { AlgolLocalBattle, AlgolStaticGameAPI } from "../../../types";

export const session2battle = (
  session: AlgolLocalBattle,
  api: AlgolStaticGameAPI
) =>
  api.fromSave({
    ended: Boolean(session.endedBy),
    player: session.player,
    turn: session.turn,
    path: session.path,
    variantCode: session.variantCode,
  });
