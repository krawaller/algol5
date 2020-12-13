// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type OutwitBoardHeight = 9;
type OutwitBoardWidth = 10;

type OutwitTerrain = "corner";
type OutwitUnit = "soldiers" | "kings";
type OutwitMark = "selectunit" | "selectmovetarget";
type OutwitCommand = "move";
type OutwitPhaseCommand = never;
type OutwitPhase = "startTurn" | OutwitMark;
type OutwitUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type OutwitGenerator = "findkingtargets" | "findsoldiertargets";
type OutwitArtifactLayer = "movetargets";
type OutwitTerrainLayer = "corner" | "mycorner" | "oppcorner" | "nocorner";
type OutwitLayer =
  | CommonLayer
  | OutwitUnitLayer
  | OutwitArtifactLayer
  | OutwitTerrainLayer;
type OutwitBattlePos = never;
type OutwitBattleVar = never;
type OutwitTurnPos = never;
type OutwitTurnVar = never;

type OutwitBoardName = "basic";
type OutwitSetupName = "basic";
type OutwitRulesetName = "basic";
type OutwitVariantName = "regular";

type OutwitGrid = never;

type OutwitPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9"
  | "j1"
  | "j2"
  | "j3"
  | "j4"
  | "j5"
  | "j6"
  | "j7"
  | "j8"
  | "j9";

export type OutwitBlob = AlgolGameBlob<
  OutwitArtifactLayer,
  OutwitBoardName,
  OutwitBattlePos,
  OutwitBattleVar,
  OutwitCommand,
  OutwitGenerator,
  OutwitGrid,
  OutwitLayer,
  OutwitMark,
  OutwitPhase,
  OutwitPosition,
  OutwitRulesetName,
  OutwitSetupName,
  OutwitTerrain,
  OutwitTurnPos,
  OutwitTurnVar,
  OutwitUnit
>;

export type OutwitDefinition = FullDef<OutwitBlob>;
