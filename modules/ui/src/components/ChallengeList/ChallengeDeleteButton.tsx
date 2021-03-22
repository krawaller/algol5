import React from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { Button } from "../Button";

type ChallengeDeleteButtonProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeDeleteButton = (props: ChallengeDeleteButtonProps) => {
  const { challenge } = props;
  const { challengeId } = challenge;
  const api = useRemoteAPI();
  const handleClick = () => {
    api.challenge.deleteChallenge({ challengeId });
  };
  return <Button text="X" onClick={handleClick} />;
};
