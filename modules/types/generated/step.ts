import { Layer } from "../";

export type AlgolStepLinks = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
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
    };
  };
  MARKS: { [funcname: string]: string };
  TURNVARS?: { [varname: string]: any };
  BATTLEVARS?: { [varname: string]: any };
  NEXTSPAWNID?: number;
};
