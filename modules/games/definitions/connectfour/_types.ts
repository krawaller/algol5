// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ConnectfourBoardHeight = 6;
type ConnectfourBoardWidth = 7;

type ConnectfourTerrain = "edge";
type ConnectfourUnit = "markers";
type ConnectfourMark = "selectdroptarget";
type ConnectfourCommand = "drop";
type ConnectfourPhaseCommand = never;
type ConnectfourPhase = "startTurn" | ConnectfourMark;
type ConnectfourUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "markers"
  | "mymarkers"
  | "oppmarkers"
  | "neutralmarkers";
type ConnectfourGenerator = "findwinline" | "finddroptargets";
type ConnectfourArtifactLayer = "winline" | "droptargets";
type ConnectfourTerrainLayer = "edge" | "noedge";
type ConnectfourLayer =
  | CommonLayer
  | ConnectfourUnitLayer
  | ConnectfourArtifactLayer
  | ConnectfourTerrainLayer;
type ConnectfourBattlePos = never;
type ConnectfourBattleVar = never;
type ConnectfourTurnPos = never;
type ConnectfourTurnVar = never;

type ConnectfourBoardName = "basic";
type ConnectfourSetupName = "basic";
type ConnectfourRulesetName = "basic";
type ConnectfourVariantName = "regular";

type ConnectfourGrid = never;

type ConnectfourPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6";

export type ConnectfourBlob = AlgolGameBlob<
  ConnectfourArtifactLayer,
  ConnectfourBoardName,
  ConnectfourBattlePos,
  ConnectfourBattleVar,
  ConnectfourCommand,
  ConnectfourGenerator,
  ConnectfourGrid,
  ConnectfourLayer,
  ConnectfourMark,
  ConnectfourPhase,
  ConnectfourPosition,
  ConnectfourRulesetName,
  ConnectfourSetupName,
  ConnectfourTerrain,
  ConnectfourTurnPos,
  ConnectfourTurnVar,
  ConnectfourUnit
>;

export type ConnectfourDefinition = FullDef<ConnectfourBlob>;
