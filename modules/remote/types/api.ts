// The full remote API

import { AlgolRemoteUserActions } from "./user.actions";
import { AlgolRemoteUserSubs } from "./user.subs";

export type AlgolRemoteAPI = AlgolRemoteUserActions | AlgolRemoteUserSubs;
