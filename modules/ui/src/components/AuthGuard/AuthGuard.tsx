import React, { FunctionComponent, useCallback } from "react";
import { useFirebaseUser } from "../../../../firebase/src/useFirebaseUser";
import { useFirebaseLoginRenderer } from "../../../../firebase/src/useFirebaseLoginRenderer";
import { useFirebaseApp } from "../../../../firebase/src/useFirebaseApp";
import { Button } from "../Button";

type AuthGuardProps = {
  content: () => React.ReactNode;
};

export const AuthGuard: FunctionComponent<AuthGuardProps> = props => {
  const app = useFirebaseApp();
  const user = useFirebaseUser();
  const loginRenderer = useFirebaseLoginRenderer();
  const signOut = useCallback(() => app.auth().signOut(), []);
  if (!user) return loginRenderer();
  return (
    <div>
      <p>
        Logged in as {user.displayName}!{" "}
        <Button onClick={signOut}>Sign out</Button>
      </p>
      <hr />
      {props.content()}
    </div>
  );
};
