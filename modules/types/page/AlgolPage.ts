import { FunctionComponent } from "react";

import { BattleNavActions, AppActions } from "../../ui/src/contexts";
import { AlgolNav } from "./nav";

export type AlgolPageProps = {
  actions: AppActions & BattleNavActions;
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
