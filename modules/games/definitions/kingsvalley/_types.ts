// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type KingsvalleyBoardHeight = 7;
type KingsvalleyBoardWidth = 7;

type KingsvalleyTerrain = "goal" | "water";
type KingsvalleyUnit = "soldiers" | "kings";
type KingsvalleyMark = "selectunit" | "selectmovetarget";
type KingsvalleyCommand = "slide";
type KingsvalleyPhaseCommand = never;
type KingsvalleyPhase = "startTurn" | KingsvalleyMark;
type KingsvalleyUnitLayer =
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
type KingsvalleyGenerator = "findtrappedkings" | "findmovetargets";
type KingsvalleyArtifactLayer = "enemytrappedkings" | "movetargets";
type KingsvalleyTerrainLayer = "goal" | "water" | "nogoal" | "nowater";
type KingsvalleyLayer =
  | CommonLayer
  | KingsvalleyUnitLayer
  | KingsvalleyArtifactLayer
  | KingsvalleyTerrainLayer;
type KingsvalleyBattlePos = never;
type KingsvalleyBattleVar = never;
type KingsvalleyTurnPos = never;
type KingsvalleyTurnVar = never;

type KingsvalleyBoardName = "basic" | "labyrinth";
type KingsvalleySetupName = "basic" | "retrieve" | "labyrinth";
type KingsvalleyRulesetName = "basic";
type KingsvalleyVariantName = "regular" | "retrieve" | "labyrinth";

type KingsvalleyGrid = never;

type KingsvalleyPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7";

export type KingsvalleyBlob = AlgolGameBlob<
  KingsvalleyArtifactLayer,
  KingsvalleyBoardName,
  KingsvalleyBattlePos,
  KingsvalleyBattleVar,
  KingsvalleyCommand,
  KingsvalleyGenerator,
  KingsvalleyGrid,
  KingsvalleyLayer,
  KingsvalleyMark,
  KingsvalleyPhase,
  KingsvalleyPosition,
  KingsvalleyRulesetName,
  KingsvalleySetupName,
  KingsvalleyTerrain,
  KingsvalleyTurnPos,
  KingsvalleyTurnVar,
  KingsvalleyUnit
>;

export type KingsvalleyDefinition = FullDef<KingsvalleyBlob>;
