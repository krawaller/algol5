import React, { FunctionComponent, useCallback } from "react";
import { TabBar } from "../TabBar";
import css from "./SessionViewSelector.cssProxy";

export type SessionViewSelectorActions = {
  toHistory: () => void;
  toBattleControls: () => void;
  toBattleLobby: () => void;
};

type SessionViewSelectorProps = {
  actions: SessionViewSelectorActions;
  mode: "history" | "playing" | "battlelobby";
};

const labels = {
  playing: "Play",
  history: "History",
  battlelobby: "Session",
} as const;

export const SessionViewSelector: FunctionComponent<SessionViewSelectorProps> = props => {
  const { actions, mode } = props;
  const onTabClick = useCallback((tab: string) => {
    if (tab === "history") actions.toHistory();
    else if (tab === "battlelobby") actions.toBattleLobby();
    else actions.toBattleControls();
  }, []);
  return (
    <div className={css.sessionViewSelectorContainer}>
      <TabBar labels={labels} onTabClick={onTabClick} current={mode} />
    </div>
  );
};
