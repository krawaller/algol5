import React, { FunctionComponent, useCallback, Fragment } from "react";
import { AuthGuard } from "../AuthGuard";
import css from "./NewRemoteSession.cssProxy";

type NewRemoteSessionProps = {};

export const NewRemoteSession: FunctionComponent<NewRemoteSessionProps> = props => {
  const content = useCallback(
    () => (
      <Fragment>
        <div className={css.newRemoteSessionTopInstruction}>
          Online play not yet fully implemented!
        </div>
      </Fragment>
    ),
    []
  );
  return <AuthGuard content={content} />;
};
