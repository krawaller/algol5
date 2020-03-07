// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type GowiththefloeBoardHeight = 8;
type GowiththefloeBoardWidth = 8;

type GowiththefloeTerrain = "water";
type GowiththefloeUnit = "seals" | "bears" | "holes";
type GowiththefloeMark =
  | "selectunit"
  | "selectmovetarget"
  | "selectjumptarget"
  | "selecteattarget";
type GowiththefloeCommand = "move" | "jump" | "eat";
type GowiththefloePhaseCommand = never;
type GowiththefloePhase = "startTurn" | GowiththefloeMark;
type GowiththefloeUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "seals"
  | "myseals"
  | "oppseals"
  | "neutralseals"
  | "bears"
  | "mybears"
  | "oppbears"
  | "neutralbears"
  | "holes"
  | "myholes"
  | "oppholes"
  | "neutralholes";
type GowiththefloeGenerator =
  | "findeattargets"
  | "findmovetargets"
  | "findjumptargets"
  | "findsealsmoves"
  | "findcracks";
type GowiththefloeArtifactLayer =
  | "eattargets"
  | "movetargets"
  | "jumptargets"
  | "canmove"
  | "cracks";
type GowiththefloeTerrainLayer = "water" | "nowater";
type GowiththefloeLayer =
  | CommonLayer
  | GowiththefloeUnitLayer
  | GowiththefloeArtifactLayer
  | GowiththefloeTerrainLayer;
type GowiththefloeBattlePos = never;
type GowiththefloeBattleVar = never;
type GowiththefloeTurnPos = never;
type GowiththefloeTurnVar = never;

type GowiththefloeBoardName = "basic";
type GowiththefloeSetupName = "basic";
type GowiththefloeRulesetName = "basic";
type GowiththefloeVariantName = "basic";

type GowiththefloeGrid = never;

type GowiththefloePosition =
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

type GowiththefloeBlob = AlgolGameBlob<
  GowiththefloeArtifactLayer,
  GowiththefloeBoardName,
  GowiththefloeBattlePos,
  GowiththefloeBattleVar,
  GowiththefloeCommand,
  GowiththefloeGenerator,
  GowiththefloeGrid,
  GowiththefloeLayer,
  GowiththefloeMark,
  GowiththefloePhase,
  GowiththefloePosition,
  GowiththefloeRulesetName,
  GowiththefloeSetupName,
  GowiththefloeTerrain,
  GowiththefloeTurnPos,
  GowiththefloeTurnVar,
  GowiththefloeUnit
>;

export type GowiththefloeDefinition = FullDef<GowiththefloeBlob>;
