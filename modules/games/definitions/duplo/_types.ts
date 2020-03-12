// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DuploBoardHeight = 8;
type DuploBoardWidth = 8;

type DuploTerrain = never;
type DuploUnit = "soldiers";
type DuploMark = "selectdeploy" | "selectunit" | "selecttarget";
type DuploCommand = "deploy" | "expand";
type DuploPhaseCommand = "deploy";
type DuploPhase = "startTurn" | DuploMark | DuploPhaseCommand;
type DuploUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type DuploGenerator =
  | "findspawndirs"
  | "findgrowstarts"
  | "findexpandpoints"
  | "findoppstrengths"
  | "findspawns";
type DuploArtifactLayer =
  | "spawndirs"
  | "growstarts"
  | "targets"
  | "potentialopptargets"
  | "spawns";
type DuploTerrainLayer = never;
type DuploLayer = CommonLayer | DuploUnitLayer | DuploArtifactLayer;
type DuploBattlePos = never;
type DuploBattleVar = never;
type DuploTurnPos = never;
type DuploTurnVar = never;

type DuploBoardName = "basic";
type DuploSetupName = "basic";
type DuploRulesetName = "basic";
type DuploVariantName = "regular";

type DuploGrid = never;

type DuploPosition =
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

export type DuploBlob = AlgolGameBlob<
  DuploArtifactLayer,
  DuploBoardName,
  DuploBattlePos,
  DuploBattleVar,
  DuploCommand,
  DuploGenerator,
  DuploGrid,
  DuploLayer,
  DuploMark,
  DuploPhase,
  DuploPosition,
  DuploRulesetName,
  DuploSetupName,
  DuploTerrain,
  DuploTurnPos,
  DuploTurnVar,
  DuploUnit
>;

export type DuploDefinition = FullDef<DuploBlob>;
