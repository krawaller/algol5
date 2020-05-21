import { AppActions, BattleNavActions, BattleMode, AlgolNav } from ".";
import { FunctionComponent } from "react";

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
