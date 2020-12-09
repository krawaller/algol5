import { AlgolSet } from "../set";
import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolEffectKillId<Blob extends AlgolGameBlobAnon> = {
  killid: AlgolVal<Blob, string>;
};

export type AlgolEffectMoveAt<Blob extends AlgolGameBlobAnon> = {
  moveat: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolEffectMoveId<Blob extends AlgolGameBlobAnon> = {
  moveid: [AlgolVal<Blob, string>, AlgolPos<Blob>];
};

export type AlgolEffectStompAt<Blob extends AlgolGameBlobAnon> = {
  stompat: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolEffectStompId<Blob extends AlgolGameBlobAnon> = {
  stompid: [AlgolVal<Blob, string>, AlgolPos<Blob>];
};

export type AlgolEffectSetTurnPos<Blob extends AlgolGameBlobAnon> = {
  setturnpos: [AlgolVal<Blob, Blob["turnp"]>, AlgolPos<Blob>];
};

export type AlgolEffectSetBattlePos<Blob extends AlgolGameBlobAnon> = {
  setbattlepos: [AlgolVal<Blob, Blob["btlp"]>, AlgolPos<Blob>];
};

export type AlgolEffectSetTurnVar<Blob extends AlgolGameBlobAnon> = {
  setturnvar: [AlgolVal<Blob, Blob["turnv"]>, AlgolVal<Blob, string | number>];
};

export type AlgolEffectSetBattleVar<Blob extends AlgolGameBlobAnon> = {
  setbattlevar: [AlgolVal<Blob, Blob["btlv"]>, AlgolVal<Blob, string | number>];
};

export type AlgolEffectIncreaseTurnVar<Blob extends AlgolGameBlobAnon> = {
  incturnvar:
    | [AlgolVal<Blob, Blob["turnv"]>, AlgolVal<Blob, number>]
    | [AlgolVal<Blob, Blob["turnv"]>];
};

export type AlgolEffectIncreaseBattleVar<Blob extends AlgolGameBlobAnon> = {
  incbattlevar:
    | [AlgolVal<Blob, Blob["btlv"]>, AlgolVal<Blob, number>]
    | [AlgolVal<Blob, Blob["btlv"]>];
};

export type AlgolEffectPushAt<Blob extends AlgolGameBlobAnon> = {
  pushat: // pos, dir, distance
  | [
        AlgolPos<Blob>,
        AlgolVal<Blob, string | number>,
        AlgolVal<Blob, string | number>
      ]
    // pos, dir (distance will default to 1)
    | [AlgolPos<Blob>, AlgolVal<Blob, string | number>];
};

export type AlgolEffectPushIn<Blob extends AlgolGameBlobAnon> = {
  pushin: // set, dir, distance
  | [
        AlgolSet<Blob>,
        AlgolVal<Blob, string | number>,
        AlgolVal<Blob, string | number>
      ]
    // set, dir (distance defaults to 1)
    | [AlgolSet<Blob>, AlgolVal<Blob, string | number>];
};

export type AlgolEffectKillIn<Blob extends AlgolGameBlobAnon> = {
  killin: AlgolSet<Blob>;
};

export type AlgolEffectKillAt<Blob extends AlgolGameBlobAnon> = {
  killat: AlgolPos<Blob>;
};

export type AlgolEffectSetAt<Blob extends AlgolGameBlobAnon> = {
  setat: [
    AlgolPos<Blob>,
    AlgolVal<Blob, string | number>,
    AlgolVal<Blob, string | number>
  ];
};

export type AlgolEffectSetIn<Blob extends AlgolGameBlobAnon> = {
  setin: [
    AlgolSet<Blob>,
    AlgolVal<Blob, string | number>,
    AlgolVal<Blob, string | number>
  ];
};

export type AlgolEffectSetId<Blob extends AlgolGameBlobAnon> = {
  setid: [
    AlgolVal<Blob, string | number>,
    AlgolVal<Blob, string | number>,
    AlgolVal<Blob, string | number>
  ];
};

export type AlgolEffectSpawnAt<Blob extends AlgolGameBlobAnon> = {
  spawnat:
    | [AlgolPos<Blob>, AlgolVal<Blob, Blob["unit"]>]
    | [AlgolPos<Blob>, AlgolVal<Blob, Blob["unit"]>, undefined, undefined]
    | [AlgolPos<Blob>, AlgolVal<Blob, Blob["unit"]>, AlgolVal<Blob, 0 | 1 | 2>]
    | [
        AlgolPos<Blob>,
        AlgolVal<Blob, Blob["unit"]>,
        AlgolVal<Blob, 0 | 1 | 2>,
        undefined
      ]
    | [
        AlgolPos<Blob>,
        AlgolVal<Blob, Blob["unit"]>,
        AlgolVal<Blob, 0 | 1 | 2>,
        {
          [prop: string]: AlgolVal<Blob, string | number>;
        }
      ];
};

export type AlgolEffectSpawnIn<Blob extends AlgolGameBlobAnon> = {
  spawnin:
    | [AlgolSet<Blob>, AlgolVal<Blob, Blob["unit"]>]
    | [AlgolSet<Blob>, AlgolVal<Blob, Blob["unit"]>, AlgolVal<Blob, 0 | 1 | 2>]
    | [
        AlgolSet<Blob>,
        AlgolVal<Blob, Blob["unit"]>,
        AlgolVal<Blob, 0 | 1 | 2>,
        {
          [prop: string]: AlgolVal<Blob, string | number>;
        }
      ];
};

export type AlgolEffectMorphAt<Blob extends AlgolGameBlobAnon> = {
  morphat: [AlgolPos<Blob>, AlgolVal<Blob, Blob["unit"]>];
};

export type AlgolEffectMorphIn<Blob extends AlgolGameBlobAnon> = {
  morphin: [AlgolSet<Blob>, AlgolVal<Blob, Blob["unit"]>];
};

export type AlgolEffectMorphId<Blob extends AlgolGameBlobAnon> = {
  morphid: [AlgolVal<Blob, string>, AlgolVal<Blob, Blob["unit"]>];
};

export type AlgolEffectAdoptAt<Blob extends AlgolGameBlobAnon> = {
  adoptat: [AlgolPos<Blob>, AlgolVal<Blob, 0 | 1 | 2>] | [AlgolPos<Blob>];
};

export type AlgolEffectAdoptIn<Blob extends AlgolGameBlobAnon> = {
  adoptin: [AlgolSet<Blob>, AlgolVal<Blob, 0 | 1 | 2>] | [AlgolSet<Blob>];
};

export type AlgolEffectAdoptId<Blob extends AlgolGameBlobAnon> = {
  adoptid:
    | [AlgolVal<Blob, string>, AlgolVal<Blob, 0 | 1 | 2>]
    | [AlgolVal<Blob, string>];
};
