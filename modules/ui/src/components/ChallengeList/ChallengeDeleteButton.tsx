import React from "react";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { AsyncButton } from "../Button";

type ChallengeDeleteButtonProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeDeleteButton = (props: ChallengeDeleteButtonProps) => {
  const { challenge } = props;
  const remoteAPI = useRemoteAPI();
  const { challengeId, gameId, accepting, deleting } = challenge;
  const disabled = accepting || deleting;
  const handleClick = () =>
    remoteAPI.challenge.deleteChallenge({ challengeId, gameId });
  return <AsyncButton text="X" onClick={handleClick} disabled={disabled} />;
};
