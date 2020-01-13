import React, { FunctionComponent } from "react";
import css from "./LocalSession.cssProxy";
import {
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolMeta,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";
import { ImportBattle } from "../ImportBattle";

export interface LocalSessionActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
  import: (str: string) => void;
}

type LocalSession = {
  sessions: AlgolLocalBattle[];
  graphics: AlgolGameGraphics;
  actions: LocalSessionActions;
};

export const LocalSession: FunctionComponent<LocalSession> = props => {
  const { actions, sessions, graphics } = props;
  return (
    <div className={css.localSession}>
      <Button big onClick={actions.new}>
        New local hotseat session
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
