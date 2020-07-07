import React from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useFirebaseApp } from "./useFirebaseApp";
import { useFirebaseUser } from "./useFirebaseUser";
import firebaseUiConfig from "./firebaseUiConfig";

export const SignInForm = () => {
  const firebaseApp = useFirebaseApp();
  const auth = firebaseApp.auth();
  const user = useFirebaseUser();
  if (user) {
    return (
      <div>
        Hello {user.displayName}!{" "}
        <button onClick={() => auth.signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth
        uiConfig={firebaseUiConfig}
        firebaseAuth={firebaseApp.auth()}
      />
    </div>
  );
};
