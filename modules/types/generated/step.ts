import { Layer } from "../";

export type AlgolStepLinks = {
  endTurn?: "start1" | "start2";
  endGame?: "win" | "lose" | "draw";
  endMarks?: string[];
  endedBy?: string;
  actions: { [idx: string]: string };
};

export type AlgolStep = {
  TURN: number;
  LINKS: AlgolStepLinks;
  ARTIFACTS: { [layername: string]: Layer };
  UNITLAYERS: { [layername: string]: Layer };
  UNITDATA: {
    [unitid: string]: {
      pos: string;
      id: string;
      group: string;
      owner: number;
      from?: string;
    };
  };
  MARKS: { [funcname: string]: string };
  TURNVARS?: { [varname: string]: any };
  BATTLEVARS?: { [varname: string]: any };
  NEXTSPAWNID?: number;
};
