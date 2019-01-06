// This will only exist momentarily before the first analysis is done or while an analysis is being updated

export default function templateAI(gameId) {
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
`;
}
