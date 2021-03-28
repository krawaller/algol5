import React, { FunctionComponent } from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import css from "./ChallengeList.cssProxy";
import { ChallengeListItem } from "./ChallengeList.Item";

type ChallengeListProps = {
  challenges: AlgolRemoteChallenge[];
};

export const ChallengeList: FunctionComponent<ChallengeListProps> = props => {
  const { challenges } = props;
  return (
    <div className={css.challengeListContainer}>
      {challenges
        .filter(c => !c.deleting)
        .map(c => (
          <ChallengeListItem challenge={c} key={c.challengeId} />
        ))}
    </div>
  );
};
