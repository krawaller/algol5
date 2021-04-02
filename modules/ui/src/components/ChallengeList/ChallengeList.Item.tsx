import React, { Fragment } from "react";
import Gravatar from "react-gravatar";
import { AlgolRemoteChallenge } from "../../../../remote/types/api/challenge";
import { useCurrentUser } from "../../../../remote/utils/context";
import { ListItem } from "../List";
import { ChallengeAcceptButton } from "./ChallengeAcceptButton";
import { ChallengeDeleteButton } from "./ChallengeDeleteButton";

type ChallengeListItemProps = {
  challenge: AlgolRemoteChallenge;
};

export const ChallengeListItem = (props: ChallengeListItemProps) => {
  const { challenge } = props;
  const user = useCurrentUser();
  const { issuer } = challenge;
  const pic = <Gravatar size={80} md5={issuer.gravatarHash || issuer.userId} />;
  const title = issuer.userName;
  const content = <div>wants to play!</div>;
  const actions =
    user?.userId === issuer.userId ? (
      <ChallengeDeleteButton challenge={challenge} />
    ) : (
      <Fragment>
        <div>
          <small>Accept as</small>
        </div>
        {challenge.lookingFor !== 2 && (
          <ChallengeAcceptButton challenge={challenge} as={1} />
        )}
        {challenge.lookingFor !== 1 && (
          <ChallengeAcceptButton challenge={challenge} as={2} />
        )}
      </Fragment>
    );
  return (
    <ListItem pic={pic} title={title} content={content} actions={actions} />
  );
};
