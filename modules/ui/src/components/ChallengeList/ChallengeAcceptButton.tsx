import React from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { AsyncButton } from "../Button";
import markdownCss from "../Markdown/Markdown.cssProxy";

type ChallengeAcceptButtonProps = {
  challenge: AlgolRemoteChallenge;
  as: 1 | 2;
};

export const ChallengeAcceptButton = (props: ChallengeAcceptButtonProps) => {
  const { challenge, as } = props;
  const { accepting, deleting } = challenge;
  const remoteAPI = useRemoteAPI();
  const ok = challenge.lookingFor === 0 || challenge.lookingFor === as;
  const disabled = accepting || deleting;
  const handleClick = () => {
    return remoteAPI.challenge.acceptChallenge({
      challengeId: challenge.challengeId,
      gameId: challenge.gameId,
      as,
    });
  };
  return (
    <AsyncButton onClick={handleClick} disabled={!ok || disabled}>
      <span className={markdownCss[as === 1 ? "md-plr-1" : "md-plr-2"]}>
        Plr{as}
      </span>
    </AsyncButton>
  );
};
