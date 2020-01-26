import React, { useState, useEffect } from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolGameGraphics,
  AlgolLocalBattle,
  AlgolMeta,
  AlgolError,
} from "../../../../types";
import { getSessionList } from "../../../../local/src";
import { SessionListFullError } from "./SessionList.FullError";
import { SessionListLineError } from "./SessionList.LineError";
import { SessionListItem } from "./SessionList.Item";

export interface SessionListActions {
  load: (session: AlgolLocalBattle) => void;
}

type SessionListProps = {
  graphics: AlgolGameGraphics;
  actions: SessionListActions;
  meta: AlgolMeta<string, string>;
};

type SessionInfo = {
  sessions: (AlgolLocalBattle | AlgolError)[];
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
    return <SessionListFullError error={sessionInfo.error!} />;
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
          if (session instanceof Error) {
            return <SessionListLineError graphics={graphics} error={session} />;
          }
          return (
            <SessionListItem
              session={session}
              graphics={graphics}
              actions={actions}
            />
          );
        })
      )}
    </div>
  );
};
