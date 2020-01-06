import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle, AlgolMeta } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

import css from "./BattleLanding.cssProxy";

interface BattleLandingActions {
  toHistory: () => void;
  toBattleControls: () => void;
  deleteCurrentSession: () => void;
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
        <div className={css.battleLandingContent}>
          You're playing a new {meta.name} session with id{" "}
          <code>{session.id}</code>. Once the first turn is completed you'll be
          able to view the session history here, and reload the session from the{" "}
          {meta.name} lobby.
        </div>
        <button onClick={actions.toBattleControls}>Start playing</button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className={css.battleLandingContent}>
        <div>Session ID: {session.id}</div>
        <div>Created: {new Date(session.created).toString().slice(0, 10)}</div>
        <div>Updated: {new Date(session.updated).toString().slice(0, 10)}</div>
        <div>
          Status: <SessionStatus session={session} />
        </div>
      </div>
      <div className={css.battleLandingButtons}>
        {!session.endedBy && (
          <button onClick={actions.toBattleControls}>Continue playing</button>
        )}
        <button onClick={actions.toHistory}>See history</button>
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this session? It will be forever lost!"
              )
            ) {
              actions.deleteCurrentSession();
            }
          }}
        >
          Delete session
        </button>
      </div>
    </Fragment>
  );
};
