// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type GogolBoardHeight = 8;
type GogolBoardWidth = 8;

type GogolTerrain = "homerow" | "edges";
type GogolUnit = "kings" | "soldiers";
type GogolMark =
  | "selectkingdeploy"
  | "selectunit"
  | "selectmovetarget"
  | "selectjumptarget";
type GogolCommand = "deploy" | "move" | "jump";
type GogolPhaseCommand = never;
type GogolPhase = "startTurn" | GogolMark;
type GogolUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type GogolGenerator =
  | "findforbiddenkingspots"
  | "findforbiddensoldierspots"
  | "findkingwalktargets"
  | "findadjacentenemies"
  | "findsplashed"
  | "findjumptargets";
type GogolArtifactLayer =
  | "nokings"
  | "nosoldiers"
  | "kingwalk"
  | "adjacentenemies"
  | "splashed"
  | "willdie"
  | "jumptargets";
type GogolTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "edges"
  | "nohomerow"
  | "noedges";
type GogolLayer =
  | CommonLayer
  | GogolUnitLayer
  | GogolArtifactLayer
  | GogolTerrainLayer;
type GogolBattlePos = never;
type GogolBattleVar = never;
type GogolTurnPos = never;
type GogolTurnVar = never;

type GogolBoardName = "basic";
type GogolSetupName = "basic";
type GogolRulesetName = "basic";
type GogolVariantName = "regular";

type GogolGrid = never;

type GogolPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8";

export type GogolBlob = AlgolGameBlob<
  GogolArtifactLayer,
  GogolBoardName,
  GogolBattlePos,
  GogolBattleVar,
  GogolCommand,
  GogolGenerator,
  GogolGrid,
  GogolLayer,
  GogolMark,
  GogolPhase,
  GogolPosition,
  GogolRulesetName,
  GogolSetupName,
  GogolTerrain,
  GogolTurnPos,
  GogolTurnVar,
  GogolUnit
>;

export type GogolDefinition = FullDef<GogolBlob>;
