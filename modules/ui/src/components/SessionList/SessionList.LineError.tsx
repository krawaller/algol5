import React, { FunctionComponent } from "react";
import { AlgolError, AlgolGameGraphics } from "../../../../types";
import css from "./SessionList.cssProxy";
import { Board } from "../Board";

type SessionListLineErrorProps = {
  error: AlgolError;
  graphics: AlgolGameGraphics;
};

const EMPTYARR: string[] = [];
const EMPTYOBJ = {};

// TODO - button to purge corrupt save data?

export const SessionListLineError: FunctionComponent<SessionListLineErrorProps> = props => {
  const { error, graphics } = props;
  return (
    <div key={error.message} className={css.sessionListItem}>
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
