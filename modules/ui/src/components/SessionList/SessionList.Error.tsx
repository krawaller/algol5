import React, { FunctionComponent } from "react";
import { AlgolError } from "../../../../types";
import css from "./SessionList.cssProxy";

type SessionListErrorProps = {
  error: AlgolError;
};

export const SessionListError: FunctionComponent<SessionListErrorProps> = ({
  error,
}) => {
  return (
    <div className={css.sessionListError}>
      The save data for this game is corrupt! :/
    </div>
  );
};
