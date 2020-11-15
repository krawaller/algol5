// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type IagoBoardHeight = 10;
type IagoBoardWidth = 10;

type IagoTerrain = never;
type IagoUnit = "amazons" | "stones";
type IagoMark = "selectunit" | "selectmovetarget" | "selectfiretarget";
type IagoCommand = "move" | "fire";
type IagoPhaseCommand = "move";
type IagoPhase = "startTurn" | IagoMark | IagoPhaseCommand;
type IagoUnitLayer =
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
type IagoGenerator =
  | "findmovetargets"
  | "findspawntargets"
  | "findothellovictims";
type IagoArtifactLayer = "movetargets" | "firetargets" | "victims";
type IagoTerrainLayer = never;
type IagoLayer = CommonLayer | IagoUnitLayer | IagoArtifactLayer;
type IagoBattlePos = never;
type IagoBattleVar = never;
type IagoTurnPos = "movedto";
type IagoTurnVar = "movedto";

type IagoBoardName = "basic";
type IagoSetupName = "basic";
type IagoRulesetName = "basic";
type IagoVariantName = "regular";

type IagoGrid = never;

type IagoPosition =
  | "a1"
  | "a10"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b10"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c10"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d10"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e10"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f10"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g10"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h10"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i10"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9"
  | "j1"
  | "j10"
  | "j2"
  | "j3"
  | "j4"
  | "j5"
  | "j6"
  | "j7"
  | "j8"
  | "j9";

export type IagoBlob = AlgolGameBlob<
  IagoArtifactLayer,
  IagoBoardName,
  IagoBattlePos,
  IagoBattleVar,
  IagoCommand,
  IagoGenerator,
  IagoGrid,
  IagoLayer,
  IagoMark,
  IagoPhase,
  IagoPosition,
  IagoRulesetName,
  IagoSetupName,
  IagoTerrain,
  IagoTurnPos,
  IagoTurnVar,
  IagoUnit
>;

export type IagoDefinition = FullDef<IagoBlob>;
