// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type UisgeBoardHeight = 6;
type UisgeBoardWidth = 7;

type UisgeTerrain = never;
type UisgeUnit = "soldiers" | "kings";
type UisgeMark = "selectunit" | "selectjumptarget" | "selectsteptarget";
type UisgeCommand = "jump" | "step";
type UisgePhaseCommand = never;
type UisgePhase = "startTurn" | UisgeMark;
type UisgeUnitLayer =
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
type UisgeGenerator = "findmjumptargets" | "findsteptargets" | "findgroup";
type UisgeArtifactLayer = "jumptargets" | "steptargets" | "group";
type UisgeTerrainLayer = never;
type UisgeLayer = CommonLayer | UisgeUnitLayer | UisgeArtifactLayer;
type UisgeBattlePos = never;
type UisgeBattleVar = never;
type UisgeTurnPos = never;
type UisgeTurnVar = never;

type UisgeBoardName = "basic";
type UisgeSetupName = "basic";
type UisgeRulesetName = "basic";
type UisgeVariantName = "regular";

type UisgeGrid = never;

type UisgePosition =
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

export type UisgeBlob = AlgolGameBlob<
  UisgeArtifactLayer,
  UisgeBoardName,
  UisgeBattlePos,
  UisgeBattleVar,
  UisgeCommand,
  UisgeGenerator,
  UisgeGrid,
  UisgeLayer,
  UisgeMark,
  UisgePhase,
  UisgePosition,
  UisgeRulesetName,
  UisgeSetupName,
  UisgeTerrain,
  UisgeTurnPos,
  UisgeTurnVar,
  UisgeUnit
>;

export type UisgeDefinition = FullDef<UisgeBlob>;
