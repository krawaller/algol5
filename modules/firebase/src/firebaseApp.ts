import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { firebaseConfig } from "./firebaseConfig";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
