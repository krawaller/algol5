import React from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolBattleSave,
  AlgolGameGraphics,
  AlgolLocalBattle,
} from "../../../../types";
import { Board } from "../Board";
import { parsePath } from "../../../../local/src/session/parseSession/parsePath";
import { SessionInfo } from "./SessionList.Info";

export interface SessionListActions {
  load: (save: AlgolBattleSave) => void;
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
      {sessions.map(session => (
        <div
          className={css.sessionListItem}
          onClick={() =>
            actions.load({
              endedBy: session.endedBy,
              player: session.player,
              turn: session.turn,
              path: parsePath(session.path, 0),
            })
          }
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
      ))}
    </div>
  );
};
