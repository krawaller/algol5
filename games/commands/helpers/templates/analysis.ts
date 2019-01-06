// This will only exist momentarily before the first analysis is done, so you should never see this file!

export default function templateAI(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { CommonLayer } from '../../../types';

export type ${capId}Terrain = never;
export type ${capId}Unit = never;
export type ${capId}Mark = never;
export type ${capId}Command = never;
export type ${capId}Phase = "startTurn";
export type ${capId}UnitLayer = never;
export type ${capId}ArtifactLayer = never;
export type ${capId}TerrainLayer = never;
export type ${capId}Layer = CommonLayer;
export type ${capId}Generator = never;
`
}
