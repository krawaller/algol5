import React, { FunctionComponent } from "react";
import Gravatar from "react-gravatar";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { AlgolRemoteUser } from "../../../../remote/types/api/user";
import css from "./ChallengeList.cssProxy";

type ChallengeListProps = {
  challenges: AlgolRemoteChallenge[];
  user: AlgolRemoteUser;
};

export const ChallengeList: FunctionComponent<ChallengeListProps> = props => {
  const { challenges, user } = props;
  console.log("ChallengeList!", challenges, user);
  return (
    <div className={css.challengeListContainer}>
      Stub for ChallengeList{" "}
      <Gravatar md5="0bb93d13ba17249145c60bdf0f509bc7" size={80} />
    </div>
  );
};
