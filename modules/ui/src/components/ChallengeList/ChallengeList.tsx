import React, { FunctionComponent } from "react";
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
    <div className={css.challengeListContainer}>Stub for ChallengeList</div>
  );
};
