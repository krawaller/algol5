import { AlgolRemoteUser } from "./user.type";

export type AlgolRemoteUserSubs = {
  auth: (opts: { listener: (user: AlgolRemoteUser | null) => void }) => void;
};
