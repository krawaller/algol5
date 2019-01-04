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
export type Graphics<Terrain extends string, Unit extends string> = {
  icons: { [unit in Unit]: any };
  tiles: Partial<{ [terrain in Terrain]: any }>;
};
export type Board<Terrain extends string> = {
  height: Number;
  width: Number;
  terrain: { [terrain in Terrain]: any };
};
export type Setup<Unit extends string> = Partial<{ [unit in Unit]: any }>;
export type AI = any;
export type CommandDef = any;
export type MarkDef = any;
export type StartTurn = any;
export type EndGameDef = any;
export type GeneratorDef<ArtifactLayer extends string, Layer extends string> =
  | WalkerDef<ArtifactLayer, Layer>
  | NeighbourDef<ArtifactLayer, Layer>
  | FilterDef<ArtifactLayer, Layer>;

export type DrawDef<ArtifactLayer extends string, Layer extends string> = {
  tolayer: any;
  include?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
};

export type WalkerDef<ArtifactLayer extends string, Layer extends string> = {
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

export type NeighbourDef<ArtifactLayer extends string, Layer extends string> = {
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

export type FilterDef<ArtifactLayer extends string, Layer extends string> = {
  type: "filter";
  layer: any;
  tolayer: ArtifactLayer;
  matching?: any;
};

export type Definition<
  ArtifactLayer extends string,
  Command extends string,
  Generator extends string,
  Layer extends string,
  Mark extends string,
  Unit extends string
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
  ArtifactLayer extends string,
  GeneratorName extends string,
  Layer extends string
> = { [genname in GeneratorName]: GeneratorDef<ArtifactLayer, Layer> };

export type Line = string[][]; //[string[], string[]];
export type Test = [string, string, Line[]];
export type GameTestSuite = {
  [desc: string]: Line[];
};

export type Instructions<Phase extends string> = { [phase in Phase]: any };

export type CommonLayer =
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "units"
  | "board"
  | "light"
  | "dark";

export type FullDef<
  ArtifactLayer extends string,
  Command extends string,
  Generator extends string,
  Layer extends string,
  Mark extends string,
  Phase extends string,
  Terrain extends string,
  Unit extends string
> = {
  AI: AI;
  board: Board<Terrain>;
  setup: Setup<Unit>;
  graphics: Graphics<Terrain, Unit>;
  instructions: Instructions<Phase>;
  meta: Meta;
  rules: Definition<ArtifactLayer, Command, Generator, Layer, Mark, Unit>;
  generators: Generators<ArtifactLayer, Generator, Layer>;
  scripts: GameTestSuite;
};

export function typeSignature(type, gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return {
    Definition: [
      "ArtifactLayer",
      "Command",
      "Generator",
      "Layer",
      "Mark",
      "Unit"
    ],
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
