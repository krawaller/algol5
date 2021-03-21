import React from "react";
import Gravatar from "react-gravatar";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import css from "./ChallengeList.cssProxy";

type ChallengeListItemProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeListItem = (props: ChallengeListItemProps) => {
  const { challenge } = props;
  const { issuer } = challenge;
  return (
    <div className={css.challengeListItem}>
      <Gravatar size={80} md5={issuer.gravatarHash || issuer.userId} />
      <div>{issuer.userName}</div>
    </div>
  );
};
