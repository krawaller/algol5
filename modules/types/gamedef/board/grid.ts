// https://stackoverflow.com/a/52490977
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

type AlgolGridRow<BoardWidth extends number> = Tuple<number, BoardWidth>;

export type AlgolGrid<
  BoardHeight extends number,
  BoardWidth extends number
> = Tuple<AlgolGridRow<BoardWidth>, BoardHeight>;
