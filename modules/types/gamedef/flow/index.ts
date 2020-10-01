import { AlgolStartTurnDef, AlgolCommandDef, AlgolMarkDef } from "./actions";
import { EndGameDef } from "./endGame";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolVal } from "../../primitives";

export * from "./actions";

export type Flow<Blob extends AlgolGameBlobAnon> = {
  flow?: any;
  TODO?: string;
  STATUS?: string;
  startTurn?: AlgolStartTurnDef<Blob>;
  endGame?: {
    [endgamename: string]: EndGameDef<Blob>;
  };
  commands: {
    [cmndname in Blob["cmnd"]]: AlgolCommandDef<Blob>;
  };
  marks: {
    [markname in Blob["mrk"]]: AlgolMarkDef<Blob>;
  };
  battleVars?: {
    [battlevar in Blob["btlv"]]: AlgolVal<Blob, string | number>;
  };
};
