import React, { FunctionComponent, Fragment } from "react";
import {
  AlgolError,
  decorateError,
  AlgolMeta,
  AlgolGameBlobAnon,
} from "../../../../types";
import css from "./SessionList.cssProxy";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { useAppActions } from "../../contexts";

type SessionListFullErrorProps = {
  error: AlgolError;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  wipe: () => void;
};

export const SessionListFullError: FunctionComponent<SessionListFullErrorProps> = ({
  error,
  meta,
  wipe,
}) => {
  const appActions = useAppActions();
  const handler = () =>
    appActions.reportError(
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
        <Button onClick={wipe} controlId="local-session-full-error-purge">
          Remove corrupted save data
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};
