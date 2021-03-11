import { AlgolRemoteUser } from "./user.type";

type Unsubscriber = () => void;

export type AlgolRemoteUserSubs = {
  auth: (opts: {
    listener: (user: AlgolRemoteUser | null) => void;
  }) => Unsubscriber;
};
