import React, { FunctionComponent, useCallback } from "react";
import { AuthGuard } from "../AuthGuard";

type NewRemoteSessionProps = {};

export const NewRemoteSession: FunctionComponent<NewRemoteSessionProps> = props => {
  const content = useCallback(() => <div>Online play omg omg!</div>, []);
  return <AuthGuard content={content} />;
};
