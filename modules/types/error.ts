const AlgolErrorSymbol = Symbol("AlgolError");

export type AlgolError = Error & {
  [AlgolErrorSymbol]?: true;
  meta?: any;
  id?: string;
  stack?: string;
};

export const isAlgolError = (err: AlgolError) => err[AlgolErrorSymbol] === true;

type DecorateErrorOpts = {
  id: string;
  message: string;
  meta?: any;
  err: AlgolError;
};

export const decorateError = (opts: DecorateErrorOpts) => {
  const { id, message, meta, err } = opts;
  const decoratedError: AlgolError = new Error();
  decoratedError.stack = err.stack;
  decoratedError.id = id;
  decoratedError.message = message;
  decoratedError.meta = meta;
  decoratedError[AlgolErrorSymbol] = true;
  return decoratedError;
};

type NewAlgolErrorOpts = {
  id: string;
  message: string;
  meta?: any;
};

export const NewAlgolError = (opts: NewAlgolErrorOpts) => {
  return decorateError({ err: new Error(), ...opts });
};
