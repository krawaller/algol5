import React, { useState, useEffect } from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolGameGraphics,
  AlgolLocalBattle,
  AlgolMeta,
  AlgolError,
} from "../../../../types";
import { Board } from "../Board";
import { SessionInfo } from "./SessionList.Info";
import { sprites2board } from "../../../../encoding/src/sprites/sprite.sprites2board";
import { getSessionList } from "../../../../local/src";
import { SessionListError } from "./SessionList.Error";

export interface SessionListActions {
  load: (session: AlgolLocalBattle) => void;
}

type SessionListProps = {
  graphics: AlgolGameGraphics;
  actions: SessionListActions;
  meta: AlgolMeta<string, string>;
};

const EMPTYARR: string[] = [];

type SessionInfo = {
  sessions: AlgolLocalBattle[];
  status: "initial" | "loaded" | "error";
  error?: AlgolError;
};

/**
 * A component to show a list of sessions
 */
export const SessionList: React.FunctionComponent<SessionListProps> = ({
  actions,
  graphics,
  meta,
}) => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
    sessions: [],
    status: "initial",
  });
  useEffect(() => {
    try {
      const sessions = getSessionList(meta.id, false).concat(
        getSessionList(meta.id, true)
      );
      setSessionInfo({
        sessions,
        status: "loaded",
      });
    } catch (err) {
      setSessionInfo({
        sessions: [],
        status: "error",
        error: err,
      });
    }
  }, [meta.id]);
  if (sessionInfo.status === "initial") {
    return null;
  }
  if (sessionInfo.status === "error") {
    return <SessionListError error={sessionInfo.error!} />;
  }
  return (
    <div>
      <div className={css.sessionListInstruction}>
        Click a previous session below to load it!
      </div>
      {sessionInfo.sessions.length === 0 ? (
        <div className={css.sessionListEmpty}>No saved sessions found</div>
      ) : (
        sessionInfo.sessions.map(session => {
          const board = sprites2board(session.sprites);
          return (
            <div
              key={session.id}
              className={css.sessionListItem}
              onClick={() => actions.load(session)}
            >
              <div className={css.sessionListItemScreenshot}>
                <Board
                  graphics={graphics}
                  potentialMarks={EMPTYARR}
                  marks={board.marks}
                  units={board.units}
                />
              </div>
              <SessionInfo session={session} />
            </div>
          );
        })
      )}
    </div>
  );
};
