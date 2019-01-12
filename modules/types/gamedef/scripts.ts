export type ScriptLine = {
  commands: string[];
  include?: string[];
  exclude?: string[];
};
export type Test = [string, string, ScriptLine[]];
export type GameTestSuite = {
  [desc: string]: ScriptLine[];
};
