import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle, AlgolMeta } from "../../../../types";

type BattleLandingNewSession = {
  session: AlgolLocalBattle;
  meta: AlgolMeta<string, string>;
};

export const BattleLandingNewSession: FunctionComponent<BattleLandingNewSession> = props => {
  const { meta, session } = props;
  return session.type === "fork" ? (
    <Fragment>
      You're playing a forked {meta.name} session with id{" "}
      <code>{session.id}</code>. It was created from a point in time in another
      session, from which it is now independent.
    </Fragment>
  ) : session.type === "imported" ? (
    <Fragment>
      This is an imported {meta.name} session, given the new id{" "}
      <code>{session.id}</code>.
    </Fragment>
  ) : (
    <Fragment>
      You're playing a new {meta.name} session with id <code>{session.id}</code>
      . Once the first turn is completed you'll be able to view the session
      history here, and reload the session from the {meta.name} lobby.
    </Fragment>
  );
};
