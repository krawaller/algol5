import { useFirebaseApp } from "./useFirebaseApp";

export const useFirebaseDatabase = () => {
  const app = useFirebaseApp();
  return app.database();
};
