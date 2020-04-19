// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type PaperneutronBoardHeight = 4;
type PaperneutronBoardWidth = 4;

type PaperneutronTerrain = "base";
type PaperneutronUnit = "soldiers";
type PaperneutronMark = "selectslidetarget" | "selectunit";
type PaperneutronCommand = "slide";
type PaperneutronPhaseCommand = "slide";
type PaperneutronPhase =
  | "startTurn"
  | PaperneutronMark
  | PaperneutronPhaseCommand;
type PaperneutronUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type PaperneutronGenerator = "findslidetargets";
type PaperneutronArtifactLayer = "slidetargets";
type PaperneutronTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type PaperneutronLayer =
  | CommonLayer
  | PaperneutronUnitLayer
  | PaperneutronArtifactLayer
  | PaperneutronTerrainLayer;
type PaperneutronBattlePos = never;
type PaperneutronBattleVar = never;
type PaperneutronTurnPos = "secondneutron" | "firstneutron";
type PaperneutronTurnVar = "firstneutron";

type PaperneutronBoardName = "basic";
type PaperneutronSetupName = "basic";
type PaperneutronRulesetName = "basic";
type PaperneutronVariantName = "regular";

type PaperneutronGrid = never;

type PaperneutronPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "d1"
  | "d2"
  | "d3"
  | "d4";

export type PaperneutronBlob = AlgolGameBlob<
  PaperneutronArtifactLayer,
  PaperneutronBoardName,
  PaperneutronBattlePos,
  PaperneutronBattleVar,
  PaperneutronCommand,
  PaperneutronGenerator,
  PaperneutronGrid,
  PaperneutronLayer,
  PaperneutronMark,
  PaperneutronPhase,
  PaperneutronPosition,
  PaperneutronRulesetName,
  PaperneutronSetupName,
  PaperneutronTerrain,
  PaperneutronTurnPos,
  PaperneutronTurnVar,
  PaperneutronUnit
>;

export type PaperneutronDefinition = FullDef<PaperneutronBlob>;
