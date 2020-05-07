// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type MadbishopsBoardHeight = 10;
type MadbishopsBoardWidth = 10;

type MadbishopsTerrain = never;
type MadbishopsUnit = "bishops";
type MadbishopsMark = "selectunit" | "selectmovetarget";
type MadbishopsCommand = "move";
type MadbishopsPhaseCommand = never;
type MadbishopsPhase = "startTurn" | MadbishopsMark;
type MadbishopsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
type MadbishopsGenerator = "findmovetargets" | "findthreats";
type MadbishopsArtifactLayer = "movetargets" | "killtargets" | "threatened";
type MadbishopsTerrainLayer = never;
type MadbishopsLayer =
  | CommonLayer
  | MadbishopsUnitLayer
  | MadbishopsArtifactLayer;
type MadbishopsBattlePos = never;
type MadbishopsBattleVar = never;
type MadbishopsTurnPos = never;
type MadbishopsTurnVar = never;

type MadbishopsBoardName = "basic";
type MadbishopsSetupName = "basic";
type MadbishopsRulesetName = "basic";
type MadbishopsVariantName = "regular";

type MadbishopsGrid = never;

type MadbishopsPosition =
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

export type MadbishopsBlob = AlgolGameBlob<
  MadbishopsArtifactLayer,
  MadbishopsBoardName,
  MadbishopsBattlePos,
  MadbishopsBattleVar,
  MadbishopsCommand,
  MadbishopsGenerator,
  MadbishopsGrid,
  MadbishopsLayer,
  MadbishopsMark,
  MadbishopsPhase,
  MadbishopsPosition,
  MadbishopsRulesetName,
  MadbishopsSetupName,
  MadbishopsTerrain,
  MadbishopsTurnPos,
  MadbishopsTurnVar,
  MadbishopsUnit
>;

export type MadbishopsDefinition = FullDef<MadbishopsBlob>;
