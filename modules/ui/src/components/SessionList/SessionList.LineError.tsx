import React, { FunctionComponent } from "react";
import {
  AlgolGameGraphics,
  AlgolErrorReporter,
  decorateError,
  AlgolMeta,
  AlgolGameBlobAnon,
} from "../../../../types";
import css from "./SessionList.cssProxy";
import { Board } from "../Board";
import { SessionLoadFail } from "../../../../local/src";

interface SessionListLineErrorActions {
  reportError: AlgolErrorReporter;
}

type SessionListLineErrorProps = {
  fail: SessionLoadFail;
  graphics: AlgolGameGraphics;
  actions: SessionListLineErrorActions;
  meta: AlgolMeta<AlgolGameBlobAnon>;
};

const EMPTYARR: string[] = [];
const EMPTYOBJ = {};

// TODO - button to purge corrupt save data?
// TODO - preserve more metadata about error. we need the original save string and game id

export const SessionListLineError: FunctionComponent<SessionListLineErrorProps> = props => {
  const { fail, graphics, actions, meta } = props;
  return (
    <div
      className={css.sessionListItem}
      title="Click to report"
      onClick={() =>
        actions.reportError(
          decorateError({
            err: fail.error,
            description: `Something has happened to this ${meta.name} save file, and it couldn't be correctly read.`,
            errorId: "local-save-parse-error",
            meta: {
              gameId: meta.id,
              saveStr: fail.str,
              saveId: fail.id,
            },
          }),
          "severe"
        )
      }
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
