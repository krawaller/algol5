export type Line = string[][]; //[string[], string[]];
export type Test = [string, string, Line[]];
export type GameTestSuite = {
  [desc: string]: Line[]
}