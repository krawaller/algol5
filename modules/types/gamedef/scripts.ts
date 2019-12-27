export type AlgolScriptLine<Command, Position> = {
  commands: (Command | Position | "endTurn" | "win")[];
  include?: (Command | Position | "endTurn" | "win")[];
  exclude?: (Command | Position | "endTurn" | "win")[];
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
