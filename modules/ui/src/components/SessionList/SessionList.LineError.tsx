import React, { FunctionComponent } from "react";
import {
  AlgolError,
  AlgolGameGraphics,
  AlgolErrorReporter,
} from "../../../../types";
import css from "./SessionList.cssProxy";
import { Board } from "../Board";

interface SessionListLineErrorActions {
  reportError: AlgolErrorReporter;
}

type SessionListLineErrorProps = {
  error: AlgolError;
  graphics: AlgolGameGraphics;
  actions: SessionListLineErrorActions;
};

const EMPTYARR: string[] = [];
const EMPTYOBJ = {};

// TODO - button to purge corrupt save data?

export const SessionListLineError: FunctionComponent<SessionListLineErrorProps> = props => {
  const { error, graphics, actions } = props;
  return (
    <div
      className={css.sessionListItem}
      title="Click to report"
      onClick={() => actions.reportError(error, "severe")}
    >
      <div className={css.sessionListItemScreenshot}>
        <Board
          graphics={graphics}
          potentialMarks={EMPTYARR}
          marks={EMPTYARR}
          units={EMPTYOBJ}
        />
      </div>
      <div className={css.sessionListItemErrorInfo}>
        The save data for this session is corrupt :/
      </div>
    </div>
  );
};
