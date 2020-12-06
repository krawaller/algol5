import React from "react";

import dynamic from "../../../next/node_modules/next/dynamic";

const StyledFirebaseAuth = dynamic(
  () => import("react-firebaseui/StyledFirebaseAuth"),
  { ssr: false }
);

import { useFirebaseApp } from "./useFirebaseApp";
import firebaseUiConfig from "../firebaseUiConfig";

export const useFirebaseLoginRenderer = () => {
  const app = useFirebaseApp();
  return () => (
    <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={app.auth()} />
  );
};
