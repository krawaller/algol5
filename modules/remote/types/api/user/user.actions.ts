import { AlgolRemoteUser } from "./user.type";

export type AlgolRemoteUserActions = {
  login: (opts: {
    userName: string;
    password: string;
  }) => Promise<AlgolRemoteUser>;
  register: (opts: {
    userName: string;
    password: string;
  }) => Promise<AlgolRemoteUser>;
};

// TODO - displayname, update info?
