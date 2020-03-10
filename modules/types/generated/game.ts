import { AlgolStep, AlgolContentAnon, AlgolIconMap } from "../";
import { GameId } from "../../games/dist/list";
import {
  AlgolSetupAnon,
  AlgolBoardAnon,
  AlgolVariantAnon,
  AlgolSetupBookAnon,
  AlgolBoardBookAnon,
} from "../gamedef";

export type AlgolGame = {
  gameId: GameId;
  setBoard: (board: AlgolBoardAnon) => void;
  newBattle: (setup: AlgolSetupAnon, ruleset: string) => AlgolStep;
  action: {
    [funcName: string]: (
      step: Partial<AlgolStep>,
      action?: string
    ) => AlgolStep;
  };
  instruction: {
    [funcName: string]: (step: AlgolStep) => AlgolContentAnon;
  };
  commands: Record<string, AlgolCommandInfo>; // TODO - per plr/ruleset/sth?
  iconMap: AlgolIconMap;
  variants: AlgolVariantAnon[];
  setups: AlgolSetupBookAnon;
  boards: AlgolBoardBookAnon;
};

export type AlgolCommandInfo = {};
