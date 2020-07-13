import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const useFirebaseApp = () => {
  return firebaseApp;
};
