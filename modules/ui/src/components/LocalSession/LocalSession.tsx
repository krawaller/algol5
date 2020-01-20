import React, { FunctionComponent } from "react";
import css from "./LocalSession.cssProxy";
import { AlgolLocalBattle, AlgolGameGraphics } from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";
import { ImportBattle } from "../ImportBattle";

export interface LocalSessionActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
  import: (str: string) => void;
  continuePrevious: () => void;
}

type LocalSessionProps = {
  sessions: AlgolLocalBattle[];
  graphics: AlgolGameGraphics;
  actions: LocalSessionActions;
  hasPrevious: boolean;
};

export const LocalSession: FunctionComponent<LocalSessionProps> = props => {
  const { actions, sessions, graphics, hasPrevious } = props;
  return (
    <div className={css.localSession}>
      <Button big onClick={actions.new}>
        New local hotseat session
      </Button>
      <div className={css.localSessionDivider} />
      <Button
        disabled={!hasPrevious && "No previous battle found for this game."}
        onClick={actions.continuePrevious}
      >
        Load previous battle
      </Button>
      <div className={css.localSessionDivider} />
      <Button disabled="AI is in the works, but remote play will be implemented first.">
        Versus AI
      </Button>
      <div className={css.localSessionDivider} />
      <ImportBattle actions={actions} />
      <div className={css.localSessionDivider} />
      <SessionList sessions={sessions} graphics={graphics} actions={actions} />
    </div>
  );
};
