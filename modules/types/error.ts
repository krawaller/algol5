const AlgolErrorSymbol = Symbol("AlgolError");

export type AlgolError = Error & {
  [AlgolErrorSymbol]?: true;
  meta?: any;
  errorId?: string;
  stack?: string;
  controlId?: string;
};

export const isAlgolError = (obj: any): obj is AlgolError =>
  (((obj || {}) as unknown) as AlgolError)[AlgolErrorSymbol] === true;

type DecorateErrorOpts = {
  errorId: string;
  message: string;
  meta?: any;
  err: Error;
};

export const decorateError = (opts: DecorateErrorOpts) => {
  const { errorId: id, message, meta, err } = opts;
  const decoratedError: AlgolError = err;
  decoratedError.errorId = id;
  decoratedError.message = message;
  decoratedError.meta = meta;
  decoratedError[AlgolErrorSymbol] = true;
  return decoratedError;
};

type NewAlgolErrorOpts = {
  errorId: string;
  message: string;
  meta?: any;
};

export const NewAlgolError = (opts: NewAlgolErrorOpts) => {
  return decorateError({ err: new Error(), ...opts });
};
