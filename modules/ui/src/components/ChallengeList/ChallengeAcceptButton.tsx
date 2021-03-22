import React from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { Button } from "../Button";
import markdownCss from "../Markdown/Markdown.cssProxy";

type ChallengeAcceptButtonProps = {
  challenge: AlgolRemoteChallenge;
  as: 1 | 2;
};

export const ChallengeAcceptButton = (props: ChallengeAcceptButtonProps) => {
  const { challenge, as } = props;
  const api = useRemoteAPI();
  const ok = challenge.lookingFor === 0 || challenge.lookingFor === as;
  const handleClick = () => {
    api.challenge.acceptChallenge({
      challengeId: challenge.challengeId,
      as,
    });
  };
  return (
    <Button onClick={handleClick} disabled={!ok}>
      <span className={markdownCss[as === 1 ? "md-plr-1" : "md-plr-2"]}>
        Plr{as}
      </span>
    </Button>
  );
};
