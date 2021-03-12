import { GameId } from "../../../../games/dist/list";
import { AlgolUserId } from "../user/user.type";

export type AlgolRemoteChallenge = {
  challengeId: string;
  gameId: GameId;
  variantCode?: string;
  issuer: AlgolUserId;
  lookingFor: 1 | 2 | 0; // 0 means any
  timestamp: number;
};
