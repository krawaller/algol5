import { AlgolLocalBattle, AlgolStaticGameAPI } from "../../../types";
import { parsePath } from "../../../encoding/path";

export const session2battle = (
  session: AlgolLocalBattle,
  api: AlgolStaticGameAPI
) =>
  api.fromSave({
    ended: Boolean(session.endedBy),
    player: session.player,
    turn: session.turn,
    path: parsePath(session.path, 0),
  });
