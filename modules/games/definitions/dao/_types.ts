// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DaoBoardHeight = 4;
type DaoBoardWidth = 4;

type DaoTerrain = "corners";
type DaoUnit = "soldiers";
type DaoMark = "selectunit" | "selectmovetarget";
type DaoCommand = "move";
type DaoPhaseCommand = never;
type DaoPhase = "startTurn" | DaoMark;
type DaoUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type DaoGenerator = "findmovetargets" | "findwinline" | "findwinblock";
type DaoArtifactLayer = "movetargets" | "winline" | "winblock";
type DaoTerrainLayer = "corners" | "nocorners";
type DaoLayer = CommonLayer | DaoUnitLayer | DaoArtifactLayer | DaoTerrainLayer;
type DaoBattlePos = never;
type DaoBattleVar = never;
type DaoTurnPos = never;
type DaoTurnVar = never;

type DaoBoardName = "basic";
type DaoSetupName = "basic";
type DaoRulesetName = "basic";
type DaoVariantName = "regular";

type DaoGrid = never;

type DaoPosition =
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

export type DaoBlob = AlgolGameBlob<
  DaoArtifactLayer,
  DaoBoardName,
  DaoBattlePos,
  DaoBattleVar,
  DaoCommand,
  DaoGenerator,
  DaoGrid,
  DaoLayer,
  DaoMark,
  DaoPhase,
  DaoPosition,
  DaoRulesetName,
  DaoSetupName,
  DaoTerrain,
  DaoTurnPos,
  DaoTurnVar,
  DaoUnit
>;

export type DaoDefinition = FullDef<DaoBlob>;
