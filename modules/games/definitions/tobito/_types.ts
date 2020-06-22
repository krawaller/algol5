// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TobitoBoardHeight = 3;
type TobitoBoardWidth = 5;

type TobitoTerrain = "base";
type TobitoUnit = "runners" | "finishers";
type TobitoMark =
  | "selectunit"
  | "selectmovetarget"
  | "selectrelocatee"
  | "selectrelocationtarget";
type TobitoCommand = "move" | "relocate";
type TobitoPhaseCommand = "move" | "relocate";
type TobitoPhase = "startTurn" | TobitoMark | TobitoPhaseCommand;
type TobitoUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "runners"
  | "myrunners"
  | "opprunners"
  | "neutralrunners"
  | "finishers"
  | "myfinishers"
  | "oppfinishers"
  | "neutralfinishers";
type TobitoGenerator = "findmovetargets" | "findrelocatees";
type TobitoArtifactLayer = "movetargets" | "relocatees";
type TobitoTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type TobitoLayer =
  | CommonLayer
  | TobitoUnitLayer
  | TobitoArtifactLayer
  | TobitoTerrainLayer;
type TobitoBattlePos = never;
type TobitoBattleVar = never;
type TobitoTurnPos = never;
type TobitoTurnVar = never;

type TobitoBoardName = "basic";
type TobitoSetupName = "basic" | "neutral";
type TobitoRulesetName = "basic";
type TobitoVariantName = "regular";

type TobitoGrid = never;

type TobitoPosition =
  | "a1"
  | "a2"
  | "a3"
  | "b1"
  | "b2"
  | "b3"
  | "c1"
  | "c2"
  | "c3"
  | "d1"
  | "d2"
  | "d3"
  | "e1"
  | "e2"
  | "e3";

export type TobitoBlob = AlgolGameBlob<
  TobitoArtifactLayer,
  TobitoBoardName,
  TobitoBattlePos,
  TobitoBattleVar,
  TobitoCommand,
  TobitoGenerator,
  TobitoGrid,
  TobitoLayer,
  TobitoMark,
  TobitoPhase,
  TobitoPosition,
  TobitoRulesetName,
  TobitoSetupName,
  TobitoTerrain,
  TobitoTurnPos,
  TobitoTurnVar,
  TobitoUnit
>;

export type TobitoDefinition = FullDef<TobitoBlob>;
