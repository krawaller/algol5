import React, { useCallback, Fragment } from "react";
import { AuthGuard } from "../AuthGuard";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = () => {
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
