import { Subscriber } from "../../helpers";
import { AlgolRemoteUser } from "./user.type";

export type AlgolRemoteUserSubs = {
  auth: Subscriber<AlgolRemoteUser | null>;
};
