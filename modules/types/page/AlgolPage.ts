import { FunctionComponent } from "react";

import { AppActions } from './appActions'
import { BattleMode, BattleNavActions } from './battleActions'
import { AlgolNav } from './nav'

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
