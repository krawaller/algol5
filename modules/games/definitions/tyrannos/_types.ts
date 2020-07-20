// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TyrannosBoardHeight = 9;
type TyrannosBoardWidth = 9;

type TyrannosTerrain = "base" | "temple";
type TyrannosUnit = "warriors" | "heroes" | "barricades" | "tyrannos";
type TyrannosMark = "selectunit" | "selectmovetarget" | "selectattacktarget";
type TyrannosCommand = "move" | "attack";
type TyrannosPhaseCommand = never;
type TyrannosPhase = "startTurn" | TyrannosMark;
type TyrannosUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "warriors"
  | "mywarriors"
  | "oppwarriors"
  | "neutralwarriors"
  | "heroes"
  | "myheroes"
  | "oppheroes"
  | "neutralheroes"
  | "barricades"
  | "mybarricades"
  | "oppbarricades"
  | "neutralbarricades"
  | "tyrannos"
  | "mytyrannos"
  | "opptyrannos"
  | "neutraltyrannos";
type TyrannosGenerator = "findtargets";
type TyrannosArtifactLayer = "movetargets" | "attacktargets";
type TyrannosTerrainLayer =
  | "base"
  | "mybase"
  | "oppbase"
  | "temple"
  | "nobase"
  | "notemple";
type TyrannosLayer =
  | CommonLayer
  | TyrannosUnitLayer
  | TyrannosArtifactLayer
  | TyrannosTerrainLayer;
type TyrannosBattlePos = never;
type TyrannosBattleVar = never;
type TyrannosTurnPos = never;
type TyrannosTurnVar = never;

type TyrannosBoardName = "basic";
type TyrannosSetupName = "basic";
type TyrannosRulesetName = "basic";
type TyrannosVariantName = "regular";

type TyrannosGrid = never;

type TyrannosPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9";

export type TyrannosBlob = AlgolGameBlob<
  TyrannosArtifactLayer,
  TyrannosBoardName,
  TyrannosBattlePos,
  TyrannosBattleVar,
  TyrannosCommand,
  TyrannosGenerator,
  TyrannosGrid,
  TyrannosLayer,
  TyrannosMark,
  TyrannosPhase,
  TyrannosPosition,
  TyrannosRulesetName,
  TyrannosSetupName,
  TyrannosTerrain,
  TyrannosTurnPos,
  TyrannosTurnVar,
  TyrannosUnit
>;

export type TyrannosDefinition = FullDef<TyrannosBlob>;
