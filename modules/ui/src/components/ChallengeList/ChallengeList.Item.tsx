import React from "react";
import Gravatar from "react-gravatar";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { ListItem } from "../List";

type ChallengeListItemProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeListItem = (props: ChallengeListItemProps) => {
  const { challenge } = props;
  const { issuer } = challenge;
  const pic = <Gravatar size={80} md5={issuer.gravatarHash || issuer.userId} />;
  const title = issuer.userName;
  const content = <p>Do u dare?</p>;
  const onClick = () => alert("Not yet implemented");
  return (
    <ListItem pic={pic} title={title} content={content} onClick={onClick} />
  );
};
