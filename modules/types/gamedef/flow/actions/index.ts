export * from "./startTurn";
export * from "./mark";
export * from "./command";

import { AlgolEffectActionDef } from "./action";
import { AlgolGameBlobAnon } from "../../../blob";

export type AlgolEffectActionDefAnon = AlgolEffectActionDef<AlgolGameBlobAnon>;
