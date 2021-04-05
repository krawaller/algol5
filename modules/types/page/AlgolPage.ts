import { FunctionComponent } from "react";

import { AppActions } from "../../ui/src/contexts/appActions";
import {
  BattleMode,
  BattleNavActions,
} from "../../ui/src/contexts/battleActions";
import { AlgolNav } from "./nav";

export type AlgolPageProps = {
  actions: AppActions & BattleNavActions;
  ctxt: { mode?: BattleMode; sessionId?: string };
};

export type AlgolPage = FunctionComponent<AlgolPageProps> & {
  domain?: string;
  nav?: AlgolNav;
  title?: string;
  metaTitle?: string;
  mainImage?: string;
  metaDesc?: string;
  preloadImages?: string[];
};
