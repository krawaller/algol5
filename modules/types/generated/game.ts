import { AlgolStep, AlgolContentAnon, AlgolIconMap } from "../";
import { GameId } from "../../games/dist/list";
import { AlgolSetupAnon, AlgolBoardAnon } from "../gamedef";

export type AlgolGame = {
  gameId: GameId;
  setBoard: (board: AlgolBoardAnon) => void;
  newBattle: (setup: AlgolSetupAnon) => AlgolStep;
  action: {
    [funcName: string]: (
      step: Partial<AlgolStep>,
      action?: string
    ) => AlgolStep;
  };
  instruction: {
    [funcName: string]: (step: AlgolStep) => AlgolContentAnon;
  };
  commands: Record<string, AlgolCommandInfo>;
  iconMap: AlgolIconMap;
};

export type AlgolCommandInfo = {};
