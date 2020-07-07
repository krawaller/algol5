import firebase from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const useFirebaseApp = () => {
  return firebaseApp;
};
