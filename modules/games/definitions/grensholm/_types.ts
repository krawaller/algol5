// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type GrensholmBoardHeight = 4;
type GrensholmBoardWidth = 6;

type GrensholmTerrain = "homerow";
type GrensholmUnit = "soldiers" | "kings";
type GrensholmMark = "selectunit" | "selectmovetarget";
type GrensholmCommand = "move";
type GrensholmPhaseCommand = never;
type GrensholmPhase = "startTurn" | GrensholmMark;
type GrensholmUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type GrensholmGenerator = "findmovetargets";
type GrensholmArtifactLayer = "movetargets";
type GrensholmTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "nohomerow";
type GrensholmLayer =
  | CommonLayer
  | GrensholmUnitLayer
  | GrensholmArtifactLayer
  | GrensholmTerrainLayer;
type GrensholmBattlePos = never;
type GrensholmBattleVar = never;
type GrensholmTurnPos = never;
type GrensholmTurnVar = never;

type GrensholmBoardName = "basic";
type GrensholmSetupName = "basic";
type GrensholmRulesetName = "basic";
type GrensholmVariantName = "regular";

type GrensholmGrid = never;

type GrensholmPosition =
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
  | "d4"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "f1"
  | "f2"
  | "f3"
  | "f4";

export type GrensholmBlob = AlgolGameBlob<
  GrensholmArtifactLayer,
  GrensholmBoardName,
  GrensholmBattlePos,
  GrensholmBattleVar,
  GrensholmCommand,
  GrensholmGenerator,
  GrensholmGrid,
  GrensholmLayer,
  GrensholmMark,
  GrensholmPhase,
  GrensholmPosition,
  GrensholmRulesetName,
  GrensholmSetupName,
  GrensholmTerrain,
  GrensholmTurnPos,
  GrensholmTurnVar,
  GrensholmUnit
>;

export type GrensholmDefinition = FullDef<GrensholmBlob>;
