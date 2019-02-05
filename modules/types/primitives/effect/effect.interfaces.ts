import { AlgolEffect } from "./";

import { PosPos, ValPos } from "../_signatures";
import { AlgolSet } from "../set";
import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";

export interface AlgolEffectKillId<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  killid: AlgolVal<string, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectMoveAt<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  moveat: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectMoveId<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  moveid: ValPos<string, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectStompAt<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  stompat: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectStompId<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  stompid: ValPos<string, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectSetTurnPos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setturnpos: [
    AlgolVal<Turnp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectSetBattlePos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setbattlepos: [
    AlgolVal<Btlp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectSetTurnVar<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setturnvar: [
    AlgolVal<Turnv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectSetBattleVar<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setbattlevar: [
    AlgolVal<Btlv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectPushIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  pushin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectKillIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  killin: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectKillAt<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  killat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolEffectSetAt<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setat: [
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectSetIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectSetId<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setid: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

export interface AlgolEffectForPosIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  forposin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

export interface AlgolEffectForIdIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  foridin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

export interface AlgolEffectMulti<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  multi: AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

export interface AlgolEffectSpawn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  spawn:
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
            string | number,
            Btlp,
            Btlv,
            Cmnd,
            Grid,
            Layer,
            Mrk,
            Turnp,
            Turnv
          >;
        }
      ];
}

export interface AlgolEffectSpawnIn<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  spawnin:
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
            string | number,
            Btlp,
            Btlv,
            Cmnd,
            Grid,
            Layer,
            Mrk,
            Turnp,
            Turnv
          >;
        }
      ];
}
