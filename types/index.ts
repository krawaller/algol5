export * from "./explanation";

export type SaveData = {
  gameId: string;
  turnNumber: number;
  moveIndexes: number[];
  battleId: string;
  ended?: boolean;
};

export type Coords = {
  x: number;
  y: number;
};

export type Player = {
  type: string;
  name: string;
};

export type BattleUI = {
  save?: string;
  gameId: string;
  sessionId: string;
  endedBy?: string;
  winner?: 0 | 1 | 2;
  players: [Player, Player];
  board: {
    // TODO - remove?
    height: number;
    width: number;
  };
  current: {
    UI: StepUI;
    controls: StepControlUI;
    history: StepUI[];
  };
  history: StepUI[];
};

export type PositionList = {
  pos: string;
  coords: Coords;
}[];

export type StepUI = {
  playing: 0 | 1 | 2; // Can be 0 for start setup
  marks: PositionList;
  units: {
    [id: string]: {
      icon: string;
      coords: Coords;
      spawnCoords?: Coords;
    };
  };
  turn: number;
  description?: Content;
  idx?: number;
  stepIdx?: number;
  maxStepIdx?: number;
};

import { ComplexContent, Content } from "./content";
export * from "./content";

export type StepControlUI = {
  potentialMarks: PositionList;
  instruction: Content;
  commands: {
    [cmndname: string]: string;
  };
  submit: "endturn" | "win" | "draw" | "lose" | null;
  undo: string | null;
  turnStart: boolean;
  deadEnds: {
    [action: string]: true;
  };
};

type FunctionName = string;
type Position = string;
type Command = string;
type Action = Position | Command;

export type Layer = {
  [posname: string]: Object; // object with whatever props u want
};

export type Step = {
  stepid: string;
  name?: string; // name of command or mark
  path: Action[];
  ARTIFACTS: {
    [layername: string]: Layer;
  };
  UNITLAYERS: {
    [layername: string]: Layer;
  };
  UNITDATA: {
    [unitid: string]: {
      pos: string;
      id: string;
      group: string;
      owner: number;
    };
  };
  MARKS: {
    [funcname: string]: Position;
  };
  TURNVARS?: {
    [varname: string]: any;
  };
  BATTLEVARS?: {
    [varname: string]: any;
  };
  clones?: any; // whaaat?
};

export type Turn = {
  ends: {
    win: string[];
    lose: string[];
    draw: string[];
  };
  deadEnds: {
    [stepid: string]: {
      [action: string]: true;
    };
  };
  steps: {
    [stepid: string]: Step;
  };
  next: {
    [stepid: string]: Turn;
  };
  player: 1 | 2;
  turn: number;
  links: {
    [stepid: string]: {
      [action: string]: FunctionName;
    };
  };
  endMarks: {
    [stepid: string]: {
      [action: string]: Layer;
    };
  };
  canend?: boolean;
  blockedby?: string;
};

export type Game = {
  commands: any;
  id: string;
  graphics: {
    icons: any;
    tiles: any;
  };
  board: {
    terrain: any;
    height: number;
    width: number;
  };
  canalwaysend?: {
    [funcname: string]: true;
  };
  debug: () => Object;
};

export type Session = {
  gameId: string;
  game: Game;
  turn: Turn;
  step: Step;
  savedIndexes: number[];
  markTimeStamps: {};
  undo: any[];
  players: [Player, Player];
  id: string;
  battleId: string;
  winner?: 0 | 1 | 2;
  endedBy?: string;
  saveString?: string;
  history: StepUI[];
  currentSteps: StepUI[];
  inflating?: boolean;
};

/* ---------------------------------------- Definition stuff ----------------------------------------  */

export type Definition = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  meta: Meta;
  graphics: Graphics;
  board: Board;
  setup?: Setup;
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

// ------------------------ FROM NEW ------------------------

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
export type Graphics<
  Terrain extends string = string,
  Unit extends string = string
> = {
  icons: { [unit in Unit]: any };
  tiles: Partial<{ [terrain in Terrain]: any }>;
};
export type Board<Terrain extends string = string> = {
  height: Number;
  width: Number;
  terrain: { [terrain in Terrain]: any };
};
export type Setup<Unit extends string = string> = Partial<
  { [unit in Unit]: any }
>;
export type AI = any;
export type CommandDef = any;
export type MarkDef = any;
export type StartTurn = any;
export type EndGameDef = any;
export type GeneratorDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> =
  | WalkerDef<ArtifactLayer, Layer>
  | NeighbourDef<ArtifactLayer, Layer>
  | FilterDef<ArtifactLayer, Layer>;

export type DrawDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  tolayer: any;
  include?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
};

export type WalkerDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
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
    start?: DrawDef<ArtifactLayer, Layer>;
    steps?: DrawDef<ArtifactLayer, Layer>;
    block?: DrawDef<ArtifactLayer, Layer>;
    last?: DrawDef<ArtifactLayer, Layer>;
    all?: DrawDef<ArtifactLayer, Layer>;
    count?: DrawDef<ArtifactLayer, Layer>;
  };
};

export type NeighbourDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  type: "neighbour";
  dir?: any;
  dirs?: any;
  start?: any;
  starts?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
  draw: {
    start?: DrawDef<ArtifactLayer, Layer>;
    neighbours?: DrawDef<ArtifactLayer, Layer>;
  };
};

export type FilterDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  type: "filter";
  layer: any;
  tolayer: ArtifactLayer;
  matching?: any;
};

export type Flow<
  ArtifactLayer extends string = string,
  Command extends string = string,
  Generator extends string = string,
  Layer extends string = string,
  Mark extends string = string,
  Unit extends string = string
> = {
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
  commands: { [cmndname in Command]: CommandDef };
  marks: { [markname in Mark]: MarkDef };
};

export type Generators<
  ArtifactLayer extends string = string,
  GeneratorName extends string = string,
  Layer extends string = string
> = { [genname in GeneratorName]: GeneratorDef<ArtifactLayer, Layer> };

export type Line = string[][]; //[string[], string[]];
export type Test = [string, string, Line[]];
export type GameTestSuite = {
  [desc: string]: Line[];
};

export type Instructions<Phase extends string = string> = {
  [phase in Phase]: any
};

export type CommonLayer =
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "units"
  | "board"
  | "light"
  | "dark";

export type FullDef<
  ArtifactLayer extends string = string,
  Command extends string = string,
  Generator extends string = string,
  Layer extends string = string,
  Mark extends string = string,
  Phase extends string = string,
  Terrain extends string = string,
  Unit extends string = string
> = {
  AI: AI;
  board: Board<Terrain>;
  setup: Setup<Unit>;
  graphics: Graphics<Terrain, Unit>;
  instructions: Instructions<Phase>;
  meta: Meta;
  flow: Flow<ArtifactLayer, Command, Generator, Layer, Mark, Unit>;
  generators: Generators<ArtifactLayer, Generator, Layer>;
  scripts: GameTestSuite;
};

export function typeSignature(type, gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return {
    Flow: ["ArtifactLayer", "Command", "Generator", "Layer", "Mark", "Unit"],
    Graphics: ["Terrain", "Unit"],
    Instructions: ["Phase"],
    Board: ["Terrain"],
    Setup: ["Unit"],
    Generators: ["ArtifactLayer", "Generator", "Layer"],
    FullDef: [
      "ArtifactLayer",
      "Command",
      "Generator",
      "Layer",
      "Mark",
      "Phase",
      "Terrain",
      "Unit"
    ]
  }[type]
    .map(t => capId + t)
    .join(", ");
}
