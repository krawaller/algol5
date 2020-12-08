import { AlgolRemoteResponse } from "./response";
import { AlgolRemoteUser } from "./user";

export type AlgolRemoteUserActions = {
  login: (opts: {
    userName: string;
    password: string;
  }) => AlgolRemoteResponse<AlgolRemoteUser>;
  register: (opts: {
    userName: string;
    password: string;
  }) => AlgolRemoteResponse<AlgolRemoteUser>;
};

// TODO - displayname, update info?
