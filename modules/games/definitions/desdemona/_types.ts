// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DesdemonaBoardHeight = 5;
type DesdemonaBoardWidth = 5;

type DesdemonaTerrain = never;
type DesdemonaUnit = never;
type DesdemonaMark = never;
type DesdemonaCommand = never;
type DesdemonaPhaseCommand = never;
type DesdemonaPhase = "startTurn" | DesdemonaMark;
type DesdemonaUnitLayer = "units" | "myunits" | "oppunits" | "neutralunits";
type DesdemonaGenerator = never;
type DesdemonaArtifactLayer = never;
type DesdemonaTerrainLayer = never;
type DesdemonaLayer = CommonLayer | DesdemonaUnitLayer;
type DesdemonaBattlePos = never;
type DesdemonaBattleVar = never;
type DesdemonaTurnPos = never;
type DesdemonaTurnVar = never;

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
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5";

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
