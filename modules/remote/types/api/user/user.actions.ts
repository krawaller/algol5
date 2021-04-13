import { AlgolRemoteUser } from "./user.type";

export type AlgolRemoteUserActions = {
  login: (opts: {
    userName: string;
    password: string;
  }) => Promise<AlgolRemoteUser>;
  logout: () => void;
};

// TODO - update info, register? Holding off until we know how backend works.
