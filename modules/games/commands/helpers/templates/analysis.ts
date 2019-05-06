// This will only exist momentarily before the first analysis is done or while an analysis is being updated

export default function templateAnalysis(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `export type ${capId}Terrain = any;
export type ${capId}Unit = any;
export type ${capId}Mark = any;
export type ${capId}Command = any;
export type ${capId}Phase = any;
export type ${capId}UnitLayer = any;
export type ${capId}ArtifactLayer = any;
export type ${capId}TerrainLayer = any;
export type ${capId}Layer = any;
export type ${capId}Generator = any;
export type ${capId}Grid = any;
export type ${capId}BattlePos = any;
export type ${capId}BattleVar = any;
export type ${capId}TurnPos = any;
export type ${capId}TurnVar = any;

export type ${capId}Generators = any;
export type ${capId}Flow = any;
export type ${capId}AI = any;
export type ${capId}Anim = any;
export type ${capId}Graphics = any;
export type ${capId}Instructions = any;
export type ${capId}Meta = any;
export type ${capId}Performance = any;
export type ${capId}Scripts = any;
export type ${capId}Setup = any;
export type ${capId}Board = any;

export type ${capId}Definition = any;
`;
}
