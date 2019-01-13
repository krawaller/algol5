import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

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
export type GogolBattlePos = any;
export type GogolBattleVar = any;
export type GogolTurnPos = any;
export type GogolTurnVar = any;
 
export type GogolGenerators = Generators<GogolArtifactLayer, GogolGenerator, GogolLayer>;
export type GogolFlow = Flow<GogolArtifactLayer, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolUnit>;
export type GogolBoard = Board<GogolTerrain>;
export type GogolAI = AI;
export type GogolGraphics = Graphics<GogolTerrain, GogolUnit>;
export type GogolInstructions = Instructions<GogolPhase>;
export type GogolMeta = Meta;
export type GogolScripts = GameTestSuite;
export type GogolSetup = Setup<GogolUnit>;
