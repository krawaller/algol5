import React, { FunctionComponent } from "react";
import css from "./LocalSession.cssProxy";
import {
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolMeta,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";

export interface LocalSessionActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
}

type LocalSession = {
  sessions: AlgolLocalBattle[];
  graphics: AlgolGameGraphics;
  actions: LocalSessionActions;
  meta: AlgolMeta<string, string>;
};

export const LocalSession: FunctionComponent<LocalSession> = props => {
  const { actions, meta, sessions, graphics } = props;
  return (
    <div className={css.localSession}>
      <Button onClick={actions.new}>Start new {meta.name} session</Button>
      <p>...or click a previous session below to load it!</p>
      <SessionList sessions={sessions} graphics={graphics} actions={actions} />
    </div>
  );
};
