import { AlgolRemoteUserActions } from "./user.actions";
import { AlgolRemoteUserSubs } from "./user.subs";
export * from "./user.type";

export type AlgolRemoteUserAPI = {
  actions: AlgolRemoteUserActions;
  subs: AlgolRemoteUserSubs;
};
