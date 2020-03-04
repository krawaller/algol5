export type AlgolVariant<Board, Ruleset, Setup> = {
  ruleset: Ruleset;
  setup: Setup;
  board: Board;
  desc: string;
};

export type AlgolVariantBook<Board, Ruleset, Setup> = Record<
  string,
  AlgolVariant<Board, Ruleset, Setup>
> & { basic: AlgolVariant<Board, Ruleset, Setup> };
