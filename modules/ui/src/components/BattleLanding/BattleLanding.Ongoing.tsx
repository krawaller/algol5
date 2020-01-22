import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

type BattleLandingOngoing = {
  session: AlgolLocalBattle;
};

export const BattleLandingOngoing: FunctionComponent<BattleLandingOngoing> = props => {
  const { session } = props;
  return (
    <Fragment>
      <div>
        Session ID <code>{session.id}</code>,{" "}
        {session.type === "normal"
          ? "created"
          : session.type === "fork"
          ? "forked"
          : "imported"}{" "}
        {new Date(session.created).toString().slice(0, 10)}
        {session.updated && (
          <Fragment>
            , updated {new Date(session.updated!).toString().slice(0, 10)}
          </Fragment>
        )}
      </div>
      <div>
        Status: <SessionStatus session={session} />
      </div>
    </Fragment>
  );
};
