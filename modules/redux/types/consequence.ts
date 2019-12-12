import { Action } from "./action";

export type ConsequenceGetterAPI<
  S extends object,
  D extends object,
  P,
  T extends string
> = {
  getState: () => S;
  deps: D;
  action: Action<T, P, S, D>;
};

export type ConsequenceAPI<
  S extends object,
  D extends object,
  P,
  T extends string
> = ConsequenceGetterAPI<S, D, P, T> & {
  dispatch: (action: Action<string, any, S, D>) => void;
};

export type Consequence<
  S extends object,
  D extends object,
  P,
  T extends string
> = ((api: ConsequenceAPI<S, D, P, T>) => void) & {
  displayName?: string;
};

export type ConsequenceGetter<S extends object, D extends object> = (
  api: ConsequenceGetterAPI<S, D, any, string>
) => Consequence<S, D, any, string>[];
