import React, { FunctionComponent, Fragment } from "react";
import {
  AlgolError,
  AlgolErrorReporter,
  decorateError,
  AlgolMeta,
  AlgolGameBlobAnon,
} from "../../../../types";
import css from "./SessionList.cssProxy";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { deleteGameSessions } from "../../../../local/src";

type SessionListFullErrorActions = {
  reportError: AlgolErrorReporter;
  updateList: () => void;
};

type SessionListFullErrorProps = {
  error: AlgolError;
  actions: SessionListFullErrorActions;
  meta: AlgolMeta<AlgolGameBlobAnon>;
};

export const SessionListFullError: FunctionComponent<SessionListFullErrorProps> = ({
  error,
  actions,
  meta,
}) => {
  const handler = () =>
    actions.reportError(
      decorateError({
        err: error,
        description: `Something went wrong when trying to retrieve the stored sessions for ${meta.name}.`,
        errorId: "local-session-full-error",
        meta: {
          gameId: meta.id,
        },
      }),
      "severe"
    );
  return (
    <Fragment>
      <div className={css.sessionListFullError}>
        The save data for this game is corrupt! :/
      </div>
      <ButtonGroup>
        <Button onClick={handler} controlId="local-session-full-error-btn">
          Report error
        </Button>
        <Button
          onClick={() => {
            deleteGameSessions(meta.id);
            actions.updateList();
          }}
          controlId="local-session-full-error-purge"
        >
          Remove corrupted save data
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};
