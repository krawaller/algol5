export * from "./explanation";
export * from "./primitives";
export * from "./gamedef";
export * from "./session";
export * from "./generated";
export * from "./suite";
export * from "./screenshot";
export * from "./_args";
export * from "./error";
export * from "./blob";

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

export type PositionList = {
  pos: string;
  coords: Coords;
}[];

export type FunctionName = string;

export type Layer = {
  [posname: string]: { [prop: string]: string | number }; // object with whatever props u want
};

export type LayerCollection = {
  [idx: string]: Layer;
};

// ------------------------ FROM NEW ------------------------

export type CommonLayer =
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "units"
  | "board"
  | "light"
  | "dark";

export function typeSignature(type: keyof typeof signatures, gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  const signature = signatures[type];
  return signature.map(t => capId + t).join(", ");
}

const signatures = {
  AI: [
    "AiArtifactLayer",
    "AiAspect",
    "AiBrain",
    "AiGenerator",
    "AiGrid",
    "AiTerrain",
    "AiTerrainLayer",
    "BattlePos",
    "BattleVar",
    "BoardHeight",
    "BoardWidth",
    "Command",
    "Grid",
    "Layer",
    "Mark",
    "Position",
    "TurnPos",
    "TurnVar",
  ],
  AlgolAnimCollection: [
    "BattlePos",
    "BattleVar",
    "Command",
    "Grid",
    "Layer",
    "Mark",
    "TurnPos",
    "TurnVar",
    "Unit",
  ],
  Flow: [
    "BattlePos",
    "BattleVar",
    "Command",
    "Generator",
    "Grid",
    "Layer",
    "Mark",
    "TurnPos",
    "TurnVar",
    "Unit",
  ],
  Graphics: ["Terrain", "Unit"],
  Instructions: [
    "BattlePos",
    "BattleVar",
    "Command",
    "Grid",
    "Layer",
    "Mark",
    "Phase",
    "TurnPos",
    "TurnVar",
    "Unit",
  ],
  AlgolBoard: ["BoardHeight", "BoardWidth", "Grid", "Position", "Terrain"],
  AlgolMeta: ["Command", "Mark"],
  AlgolPerformance: ["Command", "Mark"],
  AlgolGameTestSuite: ["Command", "Position"],
  AlgolSetupBook: ["Position", "Unit"],
  AlgolVariantBook: ["BoardName", "RulesetName", "SetupName"],
  Generators: [
    "ArtifactLayer",
    "BattlePos",
    "BattleVar",
    "Command",
    "Generator",
    "Grid",
    "Layer",
    "Mark",
    "TurnPos",
    "TurnVar",
  ],
  FullDef: [
    "AiArtifactLayer",
    "AiAspect",
    "AiBrain",
    "AiGenerator",
    "AiGrid",
    "AiTerrain",
    "AiTerrainLayer",
    "ArtifactLayer",
    "BattlePos",
    "BattleVar",
    "BoardHeight",
    "BoardWidth",
    "Command",
    "Generator",
    "Grid",
    "Layer",
    "Mark",
    "Phase",
    "Position",
    "Terrain",
    "TurnPos",
    "TurnVar",
    "Unit",
  ],
} as { [sig: string]: string[] };

// ---------------------

export type Partial<T> = { [P in keyof T]?: T[P] };
