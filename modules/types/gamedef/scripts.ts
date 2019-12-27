export type AlgolScriptLine<Command, Position> = {
  commands: (Command | Position | "endTurn")[];
  include?: (Command | Position | "endTurn")[];
  exclude?: (Command | Position | "endTurn")[];
  endedBy?: string;
  endedIn?: "win" | "draw" | "lose"
};
export type Test<Command, Position> = [
  string,
  string,
  AlgolScriptLine<Command, Position>[]
];
export type AlgolGameTestSuite<Command, Position> = {
  [desc: string]: AlgolScriptLine<Command, Position>[];
};
