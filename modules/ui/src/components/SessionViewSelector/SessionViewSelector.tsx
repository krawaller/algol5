import React, { FunctionComponent } from "react";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

export interface SessionViewSelectorActions {
  toHistory: () => void;
  toBattleControls: () => void;
  toBattleLobby: () => void;
}

type SessionViewSelectorProps = {
  actions: SessionViewSelectorActions;
  mode: "history" | "playing" | "battlelobby";
};

export const SessionViewSelector: FunctionComponent<SessionViewSelectorProps> = props => {
  const { actions, mode } = props;
  return (
    <ButtonGroup merged noBottomMargin>
      <Button
        text="Play"
        onClick={actions.toBattleControls}
        active={mode === "playing"}
      />
      <Button
        text="History"
        onClick={actions.toHistory}
        active={mode === "history"}
      />
      <Button
        text="Session"
        onClick={actions.toBattleLobby}
        active={mode === "battlelobby"}
      />
    </ButtonGroup>
  );
};
