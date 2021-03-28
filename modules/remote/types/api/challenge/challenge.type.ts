import { GameId } from "../../../../games/dist/list";
import { AlgolRemoteUserDisplayInfo } from "../user/user.type";

export type AlgolRemoteChallenge = {
  challengeId: string;
  gameId: GameId;
  variantCode?: string;
  issuer: AlgolRemoteUserDisplayInfo;
  lookingFor: 1 | 2 | 0; // 0 means any
  timestamp: number;
  deleting?: boolean; // TODO - Only local
};
