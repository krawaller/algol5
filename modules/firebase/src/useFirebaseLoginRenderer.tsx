import React from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useFirebaseApp } from "./useFirebaseApp";
import firebaseUiConfig from "./firebaseUiConfig";

export const useFirebaseLoginRenderer = () => {
  const app = useFirebaseApp();
  return () => (
    <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={app.auth()} />
  );
};
