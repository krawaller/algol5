import { Layer } from "../";

export type Step = {
  stepid: string;
  name?: string; // name of command or mark
  path: Action[];
  ARTIFACTS: {
    [layername: string]: Layer;
  };
  UNITLAYERS: {
    [layername: string]: Layer;
  };
  UNITDATA: {
    [unitid: string]: {
      pos: string;
      id: string;
      group: string;
      owner: number;
    };
  };
  MARKS: {
    [funcname: string]: Position;
  };
  TURNVARS?: {
    [varname: string]: any;
  };
  BATTLEVARS?: {
    [varname: string]: any;
  };
  clones?: any; // whaaat?
};

type Position = string;
type Command = string;
type Action = Position | Command;
