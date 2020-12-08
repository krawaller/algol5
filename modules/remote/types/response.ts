// A generic response from an API method

export type AlgolRemoteResponseSuccess<T> = {
  data: T;
  error: null;
};

export type AlgolRemoteResponseFail = {
  data: null;
  error: Error;
};

export type AlgolRemoteResponse<T> =
  | Promise<AlgolRemoteResponseSuccess<T>>
  | Promise<AlgolRemoteResponseFail>;
