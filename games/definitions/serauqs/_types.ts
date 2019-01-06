import { CommonLayer } from '../../../types';

export type SerauqsTerrain = "base" | "corners" | "middle";
export type SerauqsUnit = "soldiers" | "wild";
export type SerauqsMark = "selectunit" | "selectmovetarget";
export type SerauqsCommand = "promote" | "move";
export type SerauqsPhaseCommand = never;
export type SerauqsPhase = "startTurn" | SerauqsMark;
export type SerauqsUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers" | "wild" | "mywild" | "neutralwild" | "oppwild";
export type SerauqsGenerator = "findmovetargets" | "findwinline";
export type SerauqsArtifactLayer = "movetargets" | "winline";
export type SerauqsTerrainLayer = "base" | "nobase" | "mybase" | "oppbase" | "corners" | "nocorners" | "middle" | "nomiddle";
export type SerauqsLayer = CommonLayer | SerauqsUnitLayer | SerauqsArtifactLayer | SerauqsTerrainLayer;
