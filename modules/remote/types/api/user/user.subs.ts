import { Subscriber } from "../../helpers";
import { AlgolRemoteUser } from "./user.type";

export type AlgolRemoteUserSubs = {
  user: Subscriber<AlgolRemoteUser | null>;
};
