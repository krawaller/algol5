import { Layer, Step, FunctionName } from "../";

export type Turn = {
  ends: {
    win: string[];
    lose: string[];
    draw: string[];
  };
  deadEnds: {
    [stepid: string]: {
      [action: string]: true;
    };
  };
  steps: {
    [stepid: string]: Step;
  };
  next: {
    [stepid: string]: Turn;
  };
  player: 1 | 2;
  turn: number;
  links: {
    [stepid: string]: {
      [action: string]: FunctionName;
    };
  };
  endMarks: {
    [stepid: string]: {
      [action: string]: Layer;
    };
  };
  canend?: boolean;
  blockedby?: string;
};
