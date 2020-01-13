export type AlgolBattleSave = {
  path: number[];
  player: 0 | 1 | 2;
  turn: number;
  ended?: boolean;
};
