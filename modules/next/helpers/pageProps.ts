import {
  AppActions,
  BattleNavActions,
  BattleMode,
  AlgolNav,
} from "../../ui/src/helpers";
import { FunctionComponent } from "react";

export type AlgolPageProps = {
  actions: AppActions & BattleNavActions;
  ctxt: { mode?: BattleMode; sessionId?: string };
};

export type AlgolPage = FunctionComponent<AlgolPageProps> & {
  domain?: string;
  nav?: AlgolNav;
};
