import { board2sprites, newSessionId } from "../../common";
import {
  AlgolBattle,
  AlgolSession,
  AlgolSessionPlayer,
  AlgolStaticGameAPI,
} from "../../types";
import { AlgolRemoteUser } from "../types/api/user";
import { fakeUserKurt, fakeUserRandy } from "./mocks";

type MakeFakeSessionOpts = {
  battle: AlgolBattle;
  api: AlgolStaticGameAPI;
  me: 0 | 1 | 2;
  id: string;
};

export const makeFakeSession = (opts: MakeFakeSessionOpts): AlgolSession => {
  const { battle, api, me = 1, id = newSessionId(true) } = opts;
  return {
    gameId: api.gameId,
    id,
    variantCode: battle.variant.code,
    created: Date.now() - Math.floor(Math.random() * 10000),
    type: "remote",
    player: battle.player,
    turn: battle.turnNumber,
    path: battle.path,
    ...(battle.gameEndedBy && {
      endedBy: battle.gameEndedBy,
    }),
    sprites: board2sprites({
      units: battle.state.board.units,
      iconMap: api.iconMap,
      marks: battle.gameEndedBy ? battle.state.board.marks : [],
    }),
    participants: {
      "1": me === 1 ? sessionKurt : sessionRandy,
      "2": me === 2 ? sessionKurt : sessionRandy,
    },
  };
};

const remote2sessionPlr = (
  user: AlgolRemoteUser,
  me?: boolean
): AlgolSessionPlayer => ({
  id: user.userId,
  name: user.userName,
  type: me ? "me" : "remote",
});

const sessionKurt = remote2sessionPlr(fakeUserKurt, true);
const sessionRandy = remote2sessionPlr(fakeUserRandy);
