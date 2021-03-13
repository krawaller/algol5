import React, { useCallback, Fragment, memo } from "react";
import {
  useCurrentGameChallenges,
  useCurrentUser,
  useRemoteAPI,
} from "../../../../remote/utils/context";
import { AuthGuard } from "../AuthGuard";
import { ChallengeList } from "../ChallengeList";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = memo(() => {
  const content = useCallback(() => {
    const challenges = useCurrentGameChallenges();
    const user = useCurrentUser()!;
    const game = useRemoteAPI();
    console.log("BLARP", { challenges, user, game });
    return (
      <Fragment>
        <div className={css.newRemoteSessionTopInstruction}>
          Online play not yet fully implemented!
        </div>
        <ChallengeList user={user} challenges={Object.values(challenges)} />
      </Fragment>
    );
  }, []);
  return <AuthGuard Content={content} />;
});
