import { AlgolStep, AlgolContentAnon, AlgolIconMap } from "../";
import { GameId } from "../../games/dist/list";

export type AlgolGame = {
  gameId: GameId;
  newBattle: () => AlgolStep;
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
