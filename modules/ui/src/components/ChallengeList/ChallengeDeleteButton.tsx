import React from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { AsyncButton } from "../Button";

type ChallengeDeleteButtonProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeDeleteButton = (props: ChallengeDeleteButtonProps) => {
  const { challenge } = props;
  const api = useRemoteAPI();
  const handleClick = () => api.challenge.deleteChallenge({ challenge });
  return <AsyncButton text="X" onClick={handleClick} />;
};
