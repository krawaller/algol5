export type ScriptLine<Command, Position> = {
  commands: (Command | Position | "endTurn" | "win")[];
  include?: (Command | Position | "endTurn" | "win")[];
  exclude?: (Command | Position | "endTurn" | "win")[];
};
export type Test<Command, Position> = [
  string,
  string,
  ScriptLine<Command, Position>[]
];
export type AlgolGameTestSuite<Command, Position> = {
  [desc: string]: ScriptLine<Command, Position>[];
};
