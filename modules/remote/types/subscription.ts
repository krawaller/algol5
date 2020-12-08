// A generic subscription method

type AlgolRemoteUnSub = () => void;
export type AlgolRemoteSubCallback<T> = (t: T) => void;

export type AlgolRemoteSub<T, O = undefined> = O extends undefined
  ? (callback: AlgolRemoteSubCallback<T>) => AlgolRemoteUnSub
  : (opts: O, callback: AlgolRemoteSubCallback<T>) => AlgolRemoteUnSub;
