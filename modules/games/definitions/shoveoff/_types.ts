import { CommonLayer } from '../../../types';

export type ShoveoffTerrain = "southedge" | "northedge" | "westedge" | "eastedge" | "edge";
export type ShoveoffUnit = "soldiers";
export type ShoveoffMark = "selectpushpoint";
export type ShoveoffCommand = "north" | "south" | "east" | "west";
export type ShoveoffPhaseCommand = never;
export type ShoveoffPhase = "startTurn" | ShoveoffMark;
export type ShoveoffUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type ShoveoffGenerator = "findaffected" | "findresults" | "findfourinarow";
export type ShoveoffArtifactLayer = "targetedgepoints" | "squishsouth" | "squishwest" | "squishnorth" | "squisheast" | "pushsouth" | "pushwest" | "pushnorth" | "pusheast" | "spawnsouth" | "spawnwest" | "spawnnorth" | "spawneast" | "fourinarow";
export type ShoveoffTerrainLayer = "southedge" | "nosouthedge" | "northedge" | "nonorthedge" | "westedge" | "nowestedge" | "eastedge" | "noeastedge" | "edge" | "noedge";
export type ShoveoffLayer = CommonLayer | ShoveoffUnitLayer | ShoveoffArtifactLayer | ShoveoffTerrainLayer;
