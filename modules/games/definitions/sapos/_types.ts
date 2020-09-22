// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type SaposBoardHeight = 8;
type SaposBoardWidth = 8;

type SaposTerrain = never;
type SaposUnit = "toads";
type SaposMark =
  | "selectunit"
  | "selecthoptarget"
  | "selectjumptarget"
  | "selectspawntarget";
type SaposCommand = "hop" | "jump" | "spawn";
type SaposPhaseCommand = "hop" | "jump" | "spawn";
type SaposPhase = "startTurn" | SaposMark | SaposPhaseCommand;
type SaposUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "toads"
  | "mytoads"
  | "opptoads"
  | "neutraltoads";
type SaposGenerator =
  | "findknots"
  | "findhoptargets"
  | "findjumptargets"
  | "findjumpvictims"
  | "findspawns";
type SaposArtifactLayer =
  | "knot"
  | "forbidden"
  | "hoptargets"
  | "jumptargets"
  | "jumpvictims"
  | "spawns";
type SaposTerrainLayer = never;
type SaposLayer = CommonLayer | SaposUnitLayer | SaposArtifactLayer;
type SaposBattlePos = never;
type SaposBattleVar = "plr1" | "plr2";
type SaposTurnPos = "skippedto";
type SaposTurnVar = "skippedto" | "spawns" | "skippedto";

type SaposBoardName = "basic";
type SaposSetupName = "basic";
type SaposRulesetName = "basic";
type SaposVariantName = "regular";

type SaposGrid = never;

type SaposPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8";

export type SaposBlob = AlgolGameBlob<
  SaposArtifactLayer,
  SaposBoardName,
  SaposBattlePos,
  SaposBattleVar,
  SaposCommand,
  SaposGenerator,
  SaposGrid,
  SaposLayer,
  SaposMark,
  SaposPhase,
  SaposPosition,
  SaposRulesetName,
  SaposSetupName,
  SaposTerrain,
  SaposTurnPos,
  SaposTurnVar,
  SaposUnit
>;

export type SaposDefinition = FullDef<SaposBlob>;
