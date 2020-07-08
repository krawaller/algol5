import React, { FunctionComponent, useCallback } from "react";
import { AuthGuard } from "../AuthGuard";

type NewRemoteSessionProps = {};

export const NewRemoteSession: FunctionComponent<NewRemoteSessionProps> = props => {
  const content = useCallback(
    () => <div>Online play not yet fully implemented!</div>,
    []
  );
  return <AuthGuard content={content} />;
};
