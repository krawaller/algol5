import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const useFirebaseApp = () => {
  return firebaseApp;
};
