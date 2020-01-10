import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle, AlgolMeta } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

type BattleLandingOngoing = {
  session: AlgolLocalBattle;
};

export const BattleLandingOngoing: FunctionComponent<BattleLandingOngoing> = props => {
  const { session } = props;
  return (
    <Fragment>
      <div>Session ID: {session.id}</div>
      <div>Created: {new Date(session.created).toString().slice(0, 10)}</div>
      <div>Updated: {new Date(session.updated!).toString().slice(0, 10)}</div>
      <div>
        Status: <SessionStatus session={session} />
      </div>
    </Fragment>
  );
};
