import { Layer } from "../";

export type AlgolStepLinks = {
  endTurn?: "startTurn1" | "startTurn2";
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
    [unitid: string]: AlgolUnitState;
  };
  MARKS: { [funcname: string]: string };
  TURNVARS?: { [varname: string]: any };
  BATTLEVARS?: { [varname: string]: any };
  NEXTSPAWNID?: number;
  canAlwaysEnd?: boolean;
};

export type AlgolUnitState = {
  pos: string;
  id: string;
  group: string;
  owner: number;
  from?: string;
};
