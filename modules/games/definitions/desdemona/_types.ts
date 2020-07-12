// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DesdemonaBoardHeight = 7;
type DesdemonaBoardWidth = 7;

type DesdemonaTerrain = never;
type DesdemonaUnit = "amazons" | "stones";
type DesdemonaMark = "selectunit" | "selectmovetarget" | "selectfiretarget";
type DesdemonaCommand = "move" | "fire";
type DesdemonaPhaseCommand = "move" | "fire";
type DesdemonaPhase = "startTurn" | DesdemonaMark | DesdemonaPhaseCommand;
type DesdemonaUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "amazons"
  | "myamazons"
  | "oppamazons"
  | "neutralamazons"
  | "stones"
  | "mystones"
  | "oppstones"
  | "neutralstones";
type DesdemonaGenerator =
  | "findmovetargets"
  | "findspawntargets"
  | "findcapturetargets"
  | "findvictims"
  | "findmovers";
type DesdemonaArtifactLayer =
  | "movetargets"
  | "firetargets"
  | "capturespot"
  | "victims"
  | "mymovers"
  | "oppmovers";
type DesdemonaTerrainLayer = never;
type DesdemonaLayer = CommonLayer | DesdemonaUnitLayer | DesdemonaArtifactLayer;
type DesdemonaBattlePos = never;
type DesdemonaBattleVar = never;
type DesdemonaTurnPos = "movedto";
type DesdemonaTurnVar = "movedto";

type DesdemonaBoardName = "basic";
type DesdemonaSetupName = "basic";
type DesdemonaRulesetName = "basic";
type DesdemonaVariantName = "regular";

type DesdemonaGrid = never;

type DesdemonaPosition =
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

export type DesdemonaBlob = AlgolGameBlob<
  DesdemonaArtifactLayer,
  DesdemonaBoardName,
  DesdemonaBattlePos,
  DesdemonaBattleVar,
  DesdemonaCommand,
  DesdemonaGenerator,
  DesdemonaGrid,
  DesdemonaLayer,
  DesdemonaMark,
  DesdemonaPhase,
  DesdemonaPosition,
  DesdemonaRulesetName,
  DesdemonaSetupName,
  DesdemonaTerrain,
  DesdemonaTurnPos,
  DesdemonaTurnVar,
  DesdemonaUnit
>;

export type DesdemonaDefinition = FullDef<DesdemonaBlob>;
