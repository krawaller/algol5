import { createContext, useContext, useEffect, useState } from "react";
import { FakerAPI } from "../faker";
import { AlgolRemoteUser } from "../types/api/user";

export const RemoteContext = createContext(FakerAPI);

export const useRemoteAPI = () => useContext(RemoteContext);

export const useCurrentUser = () => {
  const [user, setUser] = useState<AlgolRemoteUser | null>(null);
  const api = useRemoteAPI();
  useEffect(() => api.auth.subscribe.user({ listener: setUser }));
  return user;
};
