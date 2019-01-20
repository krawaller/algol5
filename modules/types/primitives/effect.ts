import { IfElse, IfActionElse, PlayerCase, If } from "./_logical";
import { PosPos, SetSet, SetPos, ValVal, NumNum } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";

export type AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> =
  | EffectMoveAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectStompAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetTurnPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetBattlePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetTurnVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectPushIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectKillIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectKillAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSetId<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | EffectSpawn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectSpawnIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectForPosIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectForIdIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectMulti<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | EffectPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>;

interface EffectMoveAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  moveat: PosPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface EffectStompAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  stompat: PosPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface EffectSetTurnPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setturnpos: [
    AlgolVal<Turnp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectSetBattlePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setbattlepos: [
    AlgolVal<Btlp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectSetTurnVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setturnvar: [
    AlgolVal<Turnv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectSetBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setbattlevar: [
    AlgolVal<Btlv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectPushIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  pushin: [
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectKillIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  killin: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface EffectKillAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  killat: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface EffectSetAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setat: [
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectSetIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setin: [
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectSetId<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  setid: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>, // TODO - id type?
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  ];
}

interface EffectForPosIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  forposin: [
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface EffectForIdIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  foridin: [
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface EffectMulti<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  multi: AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface EffectSpawn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  spawn:
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
            string | number,
            Btlp,
            Btlv,
            Cmnd,
            Layer,
            Mrk,
            Turnp,
            Turnv
          >;
        }
      ];
}

interface EffectSpawnIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  spawnin:
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
            string | number,
            Btlp,
            Btlv,
            Cmnd,
            Layer,
            Mrk,
            Turnp,
            Turnv
          >;
        }
      ];
}

interface EffectIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends IfElse<
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface EffectIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends If<
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface EffectIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends IfActionElse<
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface EffectPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends PlayerCase<
    AlgolEffect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
