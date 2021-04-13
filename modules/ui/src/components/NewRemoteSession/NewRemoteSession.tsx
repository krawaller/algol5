import React, { Fragment } from "react";
import {
  useMyCurrentGameChallenges,
  useForeignCurrentGameChallenges,
} from "../../../../remote/utils/context";
import { AuthGuard } from "../AuthGuard";
import { Box } from "../Box";
import { ChallengeList } from "../ChallengeList";
import { NewRemoteSessionForm } from "./NewRemoteSession.Form";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = () => {
  return <AuthGuard Content={Inner} />;
};

const Inner = () => {
  const myChallenges = useMyCurrentGameChallenges();
  const otherChallenges = useForeignCurrentGameChallenges();
  return (
    <Fragment>
      <div className={css.newRemoteSessionTopInstruction}>
        Online play not yet fully implemented!
      </div>
      <Box title="My challenges">
        <NewRemoteSessionForm />
        <ChallengeList challenges={myChallenges} />
      </Box>
      <Box title="Challenges by others">
        <ChallengeList challenges={otherChallenges} />
      </Box>
    </Fragment>
  );
};
