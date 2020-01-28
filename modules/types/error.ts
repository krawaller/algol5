const AlgolErrorSymbol = Symbol("AlgolError");

export type AlgolError = Error & {
  [AlgolErrorSymbol]?: true;
  meta?: any;
  errorId?: string;
  stack?: string;
  controlId?: string;
  description?: string;
};

export type AlgolErrorReport = {
  error: AlgolError;
  level: AlgolErrorReportLevel;
};

export type AlgolErrorReportLevel = "silent" | "warning" | "severe";

export type AlgolErrorReporter = (
  err: AlgolError,
  level?: AlgolErrorReportLevel
) => void;

export const isAlgolError = (obj: any): obj is AlgolError =>
  (((obj || {}) as unknown) as AlgolError)[AlgolErrorSymbol] === true;

type DecorateErrorOpts = {
  errorId: string;
  description: string;
  meta?: any;
  err: Error;
};

export const decorateError = (opts: DecorateErrorOpts) => {
  const { errorId: id, description, meta, err } = opts;
  const decoratedError: AlgolError = err;
  decoratedError.errorId = id;
  decoratedError.description = description;
  decoratedError.meta = meta;
  decoratedError[AlgolErrorSymbol] = true;
  return decoratedError;
};

type NewAlgolErrorOpts = {
  errorId: string;
  description: string;
  meta?: any;
};

export const NewAlgolError = (opts: NewAlgolErrorOpts) => {
  return decorateError({ err: new Error(), ...opts });
};
