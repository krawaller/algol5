import { useState, useEffect } from "react";
import { useFirebaseApp } from "./useFirebaseApp";

export const useFirebaseUser = () => {
  const app = useFirebaseApp();
  const [currentUser, setCurrentUser] = useState(app.auth().currentUser);
  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  });
  return currentUser;
};
