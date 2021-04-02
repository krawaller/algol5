import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FakerAPI } from "../faker";
import { AlgolRemoteChallenge } from "../types/api/challenge";
import { AlgolRemoteUser } from "../types/api/user";

export const RemoteContext = createContext(FakerAPI);

export const useCurrentGame = () => {
  const api = useRemoteAPI();
  return api.game.getGameAPI();
};

export const useRemoteAPI = () => useContext(RemoteContext);

export const useCurrentUser = () => {
  const [user, setUser] = useState<AlgolRemoteUser | null>(null);
  const api = useRemoteAPI();
  useEffect(() => api.auth.subscribe.user({ listener: setUser }));
  return user;
};

export const useCurrentGameChallenges = () => {
  const [challenges, setChallenges] = useState<
    Record<string, AlgolRemoteChallenge>
  >({});
  const api = useRemoteAPI();
  useEffect(
    () => api.challenge.subscribe.forCurrentGame({ listener: setChallenges }),
    []
  );
  return challenges;
};

export const useMyCurrentGameChallenges = () => {
  const user = useCurrentUser();
  const challenges = useCurrentGameChallenges();
  const myChallenges = useMemo(
    () =>
      Object.values(challenges).filter(c => c.issuer.userId === user?.userId),
    [challenges, user]
  );
  return myChallenges;
};

export const useForeignCurrentGameChallenges = () => {
  const user = useCurrentUser();
  const challenges = useCurrentGameChallenges();
  const foreignChallenges = useMemo(
    () =>
      Object.values(challenges).filter(c => c.issuer.userId !== user?.userId),
    [challenges, user]
  );
  return foreignChallenges;
};
