// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type UglyduckBoardHeight = 5;
type UglyduckBoardWidth = 5;

type UglyduckTerrain = "homerow";
type UglyduckUnit = "soldiers" | "kings";
type UglyduckMark = "selectunit" | "selectmovetarget";
type UglyduckCommand = "move";
type UglyduckPhaseCommand = never;
type UglyduckPhase = "startTurn" | UglyduckMark;
type UglyduckUnitLayer =
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
type UglyduckGenerator = "findmovetargets";
type UglyduckArtifactLayer = "movetargets";
type UglyduckTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "nohomerow";
type UglyduckLayer =
  | CommonLayer
  | UglyduckUnitLayer
  | UglyduckArtifactLayer
  | UglyduckTerrainLayer;
type UglyduckBattlePos = never;
type UglyduckBattleVar = never;
type UglyduckTurnPos = never;
type UglyduckTurnVar = never;

type UglyduckBoardName = "basic";
type UglyduckSetupName = "basic";
type UglyduckRulesetName = "basic";
type UglyduckVariantName = "regular";

type UglyduckGrid = never;

type UglyduckPosition =
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

export type UglyduckBlob = AlgolGameBlob<
  UglyduckArtifactLayer,
  UglyduckBoardName,
  UglyduckBattlePos,
  UglyduckBattleVar,
  UglyduckCommand,
  UglyduckGenerator,
  UglyduckGrid,
  UglyduckLayer,
  UglyduckMark,
  UglyduckPhase,
  UglyduckPosition,
  UglyduckRulesetName,
  UglyduckSetupName,
  UglyduckTerrain,
  UglyduckTurnPos,
  UglyduckTurnVar,
  UglyduckUnit
>;

export type UglyduckDefinition = FullDef<UglyduckBlob>;
