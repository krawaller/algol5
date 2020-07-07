import firebase from "firebase";
import * as firebaseui from "firebaseui";

export const firebaseUiConfig: firebaseui.auth.Config = {
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (result: any) => {
      return false; // To prevent redirect
    },
    signInFailure: (error: any) => {
      return Promise.resolve();
    },
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

export default firebaseUiConfig;
