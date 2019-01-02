import { Content } from "../types";

export type RuleObject = {
  who: (0 | 1 | 2)[];
  rule: Content;
};

export type RuleDescription = {
  flow: Content;
  concepts?: {
    [conceptName: string]: Content;
  };
  actions: {
    [actionName: string]: RuleObject;
  };
  tiles: {
    [tileName: string]: RuleObject;
  };
  goals: {
    [goalName: string]: RuleObject;
  };
  units: {
    [unitName: string]: RuleObject;
  };
};
export type Meta = {
  rules?: RuleDescription;
  [otherMeta: string]: any;
};
export type Graphics<Terrains, Units> = any;
export type Board<Terrains> = any;
export type Setup<Units> = any;
export type AI = any;
export type CommandDef = any;
export type MarkDef = any;
export type StartTurn = any;
export type EndGameDef = any;
export type GeneratorDef = WalkerDef | NeighbourDef | FilterDef;

export type DrawDef = {
  tolayer: any;
  include?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
};

export type WalkerDef = {
  type: "walker";
  dir?: any;
  dirs?: any;
  start?: any;
  starts?: any;
  steps?: any;
  testblocksbeforesteps?: boolean;
  blocks?: any;
  count?: any;
  startasstep?: boolean;
  max?: any;
  draw: {
    start?: DrawDef;
    steps?: DrawDef;
    block?: DrawDef;
    last?: DrawDef;
    all?: DrawDef;
    count?: DrawDef;
  };
};

export type NeighbourDef = {
  type: "neighbour";
  dir?: any;
  dirs?: any;
  start?: any;
  starts?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
  draw: {
    start?: DrawDef;
    neighbours?: DrawDef;
  };
};

export type FilterDef = {
  type: "filter";
  layer: any;
  tolayer: any;
  matching?: any;
};

export type Definition<Terrains, Units> = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  startTurn?: StartTurn;
  canalwaysend?: {
    [name: string]: true;
  };
  endGame?: {
    [endgamename: string]: EndGameDef;
  };
  endTurn?: {
    unless: any;
  };
  AI?: AI;
  commands: {
    [cmndname: string]: CommandDef;
  };
  marks: {
    [markname: string]: MarkDef;
  };
  generators: {
    [genname: string]: GeneratorDef;
  };
};

export type Line = string[][]; //[string[], string[]];
export type Test = [string, string, Line[]];
export type GameTestSuite = {
  [desc: string]: Line[];
};

export type Instructions<Phase> = any;
