import * as firebase from "firebase/app";
import "firebase/auth";

export const firebaseUiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: (result: any) => {
      return false; // To prevent redirect
    },
    signInFailure: (error: any) => {
      return Promise.resolve();
    },
  },
  credentialHelper: "none", //firebaseui.auth.CredentialHelper.NONE,
};

export default firebaseUiConfig;
