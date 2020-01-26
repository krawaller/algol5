import { Layer } from "../";
import { AlgolIcon } from "../gamedef";

export type AlgolStepLinks = {
  endTurn?: "startTurn1" | "startTurn2";
  endGame?: "win" | "lose" | "draw";
  endMarks?: string[];
  endedBy?: string;
  commands: { [idx: string]: string };
  marks: { [idx: string]: string };
  starvation?: {
    endGame?: "win" | "lose" | "draw";
    endMarks?: string[];
    endedBy?: string;
  };
};

export type AlgolStep = {
  TURN: number;
  LINKS: AlgolStepLinks;
  ARTIFACTS: { [layername: string]: Layer };
  UNITLAYERS: { [layername: string]: Layer };
  UNITDATA: AlgolArmy;
  MARKS: { [funcname: string]: string };
  TURNVARS?: { [varname: string]: any };
  BATTLEVARS?: { [varname: string]: any };
  NEXTSPAWNID?: number;
  anim?: AlgolAnimCompiled;
  // performance-related stuff
  canAlwaysEnd?: boolean;
  massiveTree?: boolean;
};

export type AlgolArmy = { [unitid: string]: AlgolUnitState };

export type AlgolUnitState = {
  pos: string;
  id: string;
  group: string;
  icon?: AlgolIcon;
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
  ghosts: [string, string, string, 0 | 1 | 2][];
};
