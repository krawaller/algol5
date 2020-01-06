import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle, AlgolMeta } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

interface BattleLandingActions {
  toHistory: () => void;
  toBattleControls: () => void;
}

type BattleLandingProps = {
  actions: BattleLandingActions;
  session: AlgolLocalBattle;
  meta: AlgolMeta<string, string>;
};

export const BattleLanding: FunctionComponent<BattleLandingProps> = props => {
  const { session, actions, meta } = props;
  if (!session.updated) {
    // New session!
    return (
      <Fragment>
        <p>
          You're playing a new {meta.name} session with id{" "}
          <code>{session.id}</code>. Once the first turn is completed you'll be
          able to view the session history here, and reload the session from the{" "}
          {meta.name} lobby.
        </p>
        <button onClick={actions.toBattleControls}>Start playing</button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div>Session ID: {session.id}</div>
      <div>Created: {new Date(session.created).toString().slice(0, 10)}</div>
      <div>Updated: {new Date(session.updated).toString().slice(0, 10)}</div>
      <div>
        Status: <SessionStatus session={session} />
      </div>
      <button onClick={actions.toHistory}>See history</button>
      {!session.endedBy && (
        <button onClick={actions.toBattleControls}>Continue playing</button>
      )}
    </Fragment>
  );
};
