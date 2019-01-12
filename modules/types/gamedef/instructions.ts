export type Instructions<Phase extends string = string> = {
  [phase in Phase]: any
};
