import React, { Fragment } from "react";
import { useCurrentGameChallenges } from "../../../../remote/utils/context";
import { AuthGuard } from "../AuthGuard";
import { ChallengeList } from "../ChallengeList";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = () => {
  return <AuthGuard Content={Inner} />;
};

const Inner = () => {
  const challenges = useCurrentGameChallenges();
  return (
    <Fragment>
      <div className={css.newRemoteSessionTopInstruction}>
        Online play not yet fully implemented!
      </div>
      <ChallengeList challenges={Object.values(challenges)} />
    </Fragment>
  );
};
