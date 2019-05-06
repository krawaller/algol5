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
  anim?: AlgolAnimCompiled;
  // performance-related stuff
  canAlwaysEnd?: boolean;
  massiveTree?: boolean;
};

export type AlgolUnitState = {
  pos: string;
  id: string;
  group: string;
  icon?: string;
  owner: 0 | 1 | 2;
  from?: string; // TODO <--- kill
};

export type AlgolAnimCompiled = {
  enterFrom: {
    [from: string]: string;
  };
  exitTo: {
    [from: string]: string;
  };
  ghosts: [string, string, string][];
};
