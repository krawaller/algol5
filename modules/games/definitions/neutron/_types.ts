// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type NeutronBoardHeight = 5;
type NeutronBoardWidth = 5;

type NeutronTerrain = "base";
type NeutronUnit = "soldiers";
type NeutronMark =
  | "selectunit"
  | "selectmytarget"
  | "selectfirstneutron"
  | "selectsingleneutrontarget"
  | "selectfirstneutrontarget"
  | "selectsecondneutrontarget";
type NeutronCommand = "slide";
type NeutronPhaseCommand = "slide";
type NeutronPhase = "startTurn" | NeutronMark | NeutronPhaseCommand;
type NeutronUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type NeutronGenerator =
  | "findsingleneutrontarget"
  | "findfirstneutrontargets"
  | "findsecondneutrontargets"
  | "findmytargets";
type NeutronArtifactLayer =
  | "singleneutrontargets"
  | "firstneutrontargets"
  | "secondneutrontargets"
  | "mytargets";
type NeutronTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type NeutronLayer =
  | CommonLayer
  | NeutronUnitLayer
  | NeutronArtifactLayer
  | NeutronTerrainLayer;
type NeutronBattlePos = never;
type NeutronBattleVar = never;
type NeutronTurnPos = "nextneutron";
type NeutronTurnVar = "neutronsdone" | "nextneutron";

type NeutronBoardName = "basic" | "paperneutron";
type NeutronSetupName = "basic" | "paperneutron";
type NeutronRulesetName = "basic" | "paperneutron";
type NeutronVariantName = "regular" | "paper neutron";

type NeutronGrid = never;

type NeutronPosition =
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

export type NeutronBlob = AlgolGameBlob<
  NeutronArtifactLayer,
  NeutronBoardName,
  NeutronBattlePos,
  NeutronBattleVar,
  NeutronCommand,
  NeutronGenerator,
  NeutronGrid,
  NeutronLayer,
  NeutronMark,
  NeutronPhase,
  NeutronPosition,
  NeutronRulesetName,
  NeutronSetupName,
  NeutronTerrain,
  NeutronTurnPos,
  NeutronTurnVar,
  NeutronUnit
>;

export type NeutronDefinition = FullDef<NeutronBlob>;
