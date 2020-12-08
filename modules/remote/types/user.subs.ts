import { AlgolRemoteSub } from "./subscription";
import { AlgolRemoteUser } from "./user";

export type AlgolRemoteUserSubs = {
  auth: AlgolRemoteSub<AlgolRemoteUser | null>;
};
