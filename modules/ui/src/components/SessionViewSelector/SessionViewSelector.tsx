import React, { FunctionComponent } from "react";
import css from "./SessionViewSelector.cssProxy";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

export interface SessionViewSelectorActions {
  toHistory: () => void;
  toBattleControls: () => void;
  toBattleLobby: () => void;
  toBattleHelp: () => void;
}

type SessionViewSelectorProps = {
  actions: SessionViewSelectorActions;
  view: "history" | "controls" | "info" | "help";
};

export const SessionViewSelector: FunctionComponent<SessionViewSelectorProps> = props => {
  const { actions, view } = props;
  return (
    <ButtonGroup>
      <Button
        text="Play"
        onClick={actions.toBattleControls}
        active={view === "controls"}
      />
      <Button
        text="History"
        onClick={actions.toHistory}
        active={view === "history"}
      />
      <Button
        text="Help"
        onClick={actions.toBattleHelp}
        active={view === "help"}
      />
      <Button
        text="Session"
        onClick={actions.toBattleLobby}
        active={view === "info"}
      />
    </ButtonGroup>
  );
};
