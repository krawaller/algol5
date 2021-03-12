import React, { useCallback, Fragment, memo } from "react";
import { useCurrentGameChallenges } from "../../../../remote/utils/context";
import { AuthGuard } from "../AuthGuard";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = memo(() => {
  const content = useCallback(() => {
    const challenges = useCurrentGameChallenges();
    console.log("CHALLENGES", challenges);
    return (
      <Fragment>
        <div className={css.newRemoteSessionTopInstruction}>
          Online play not yet fully implemented!
        </div>
      </Fragment>
    );
  }, []);
  return <AuthGuard Content={content} />;
});
