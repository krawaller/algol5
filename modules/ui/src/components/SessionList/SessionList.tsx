import React from "react";
import css from "./SessionList.cssProxy";

import { AlgolGameGraphics, AlgolLocalBattle } from "../../../../types";
import { Board } from "../Board";
import { SessionInfo } from "./SessionList.Info";

export interface SessionListActions {
  load: (session: AlgolLocalBattle) => void;
}

type SessionListProps = {
  sessions: AlgolLocalBattle[];
  graphics: AlgolGameGraphics;
  actions: SessionListActions;
};

const EMPTYARR: string[] = [];

/**
 * A component to show a list of sessions
 */
export const SessionList: React.FunctionComponent<SessionListProps> = ({
  actions,
  sessions,
  graphics,
}) => {
  return (
    <div>
      <div className={css.sessionListInstruction}>
        Click a previous session below to load it!
      </div>
      {sessions.length === 0 ? (
        <div className={css.sessionListEmpty}>No saved sessions found</div>
      ) : (
        sessions.map(session => (
          <div
            key={session.id}
            className={css.sessionListItem}
            onClick={() => actions.load(session)}
          >
            <div className={css.sessionListItemScreenshot}>
              <Board
                graphics={graphics}
                potentialMarks={EMPTYARR}
                marks={session.screenshot.marks}
                units={session.screenshot.units}
              />
            </div>
            <SessionInfo session={session} />
          </div>
        ))
      )}
    </div>
  );
};
