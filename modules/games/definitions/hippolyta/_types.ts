// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type HippolytaBoardHeight = 8;
type HippolytaBoardWidth = 8;

type HippolytaTerrain = never;
type HippolytaUnit = "amazons" | "projectile";
type HippolytaMark = "selectunit" | "selecttarget";
type HippolytaCommand = "fire";
type HippolytaPhaseCommand = never;
type HippolytaPhase = "startTurn" | HippolytaMark;
type HippolytaUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "amazons"
  | "myamazons"
  | "oppamazons"
  | "neutralamazons"
  | "projectile"
  | "myprojectile"
  | "oppprojectile"
  | "neutralprojectile";
type HippolytaGenerator = "findtargets";
type HippolytaArtifactLayer = "targets";
type HippolytaTerrainLayer = never;
type HippolytaLayer = CommonLayer | HippolytaUnitLayer | HippolytaArtifactLayer;
type HippolytaBattlePos = never;
type HippolytaBattleVar = never;
type HippolytaTurnPos = never;
type HippolytaTurnVar = never;

type HippolytaBoardName = "basic" | "mini";
type HippolytaSetupName = "mini" | "basic";
type HippolytaRulesetName = "basic";
type HippolytaVariantName = "regular";

type HippolytaGrid = never;

type HippolytaPosition =
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

export type HippolytaBlob = AlgolGameBlob<
  HippolytaArtifactLayer,
  HippolytaBoardName,
  HippolytaBattlePos,
  HippolytaBattleVar,
  HippolytaCommand,
  HippolytaGenerator,
  HippolytaGrid,
  HippolytaLayer,
  HippolytaMark,
  HippolytaPhase,
  HippolytaPosition,
  HippolytaRulesetName,
  HippolytaSetupName,
  HippolytaTerrain,
  HippolytaTurnPos,
  HippolytaTurnVar,
  HippolytaUnit
>;

export type HippolytaDefinition = FullDef<HippolytaBlob>;
