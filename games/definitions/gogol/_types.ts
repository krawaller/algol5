import { CommonLayer } from '../../types';

export type GogolTerrain = "homerow" | "edges";
export type GogolUnit = "kings" | "soldiers";
export type GogolMark = "selectkingdeploy" | "selectunit" | "selectmovetarget" | "selectjumptarget";
export type GogolCommand = "deploy" | "move" | "jump";
export type GogolPhaseCommand = never;
export type GogolPhase = "startTurn" | GogolMark;
export type GogolUnitLayer = "kings" | "mykings" | "neutralkings" | "oppkings" | "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type GogolGenerator = "findforbiddenkingspots" | "findforbiddensoldierspots" | "findkingwalktargets" | "findadjacentenemies" | "findsplashed" | "findjumptargets";
export type GogolArtifactLayer = "nokings" | "nosoldiers" | "kingwalk" | "adjacentenemies" | "splashed" | "willdie" | "jumptargets";
export type GogolTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow" | "edges" | "noedges";
export type GogolLayer = CommonLayer | GogolUnitLayer | GogolArtifactLayer | GogolTerrainLayer;
