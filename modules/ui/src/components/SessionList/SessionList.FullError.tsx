import React, { FunctionComponent } from "react";
import { AlgolError } from "../../../../types";
import css from "./SessionList.cssProxy";

type SessionListFullErrorProps = {
  error: AlgolError;
};

export const SessionListFullError: FunctionComponent<SessionListFullErrorProps> = ({
  error,
}) => {
  return (
    <div className={css.sessionListFullError}>
      The save data for this game is corrupt! :/
    </div>
  );
};
