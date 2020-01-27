import React, { useState, useEffect, useCallback, useMemo } from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolGameGraphics,
  AlgolLocalBattle,
  AlgolMeta,
  AlgolError,
  AlgolErrorReporter,
} from "../../../../types";
import {
  getSessionList,
  SessionOrFail,
  isSessionLoadFail,
  deleteSession,
} from "../../../../local/src";
import { SessionListFullError } from "./SessionList.FullError";
import { SessionListLineError } from "./SessionList.LineError";
import { SessionListItem } from "./SessionList.Item";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

export interface SessionListActions {
  loadLocalSession: (session: AlgolLocalBattle) => void;
  reportError: AlgolErrorReporter;
}

type SessionListProps = {
  graphics: AlgolGameGraphics;
  actions: SessionListActions;
  meta: AlgolMeta<string, string>;
};

type SessionInfo = {
  sessions: SessionOrFail[];
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
  const readSessions = useCallback(() => {
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
  }, [meta, setSessionInfo]);

  useEffect(readSessions, [readSessions]);

  const errorIds = useMemo(
    () => sessionInfo.sessions.filter(isSessionLoadFail).map(fail => fail.id),
    [sessionInfo]
  );

  const purgeErrorLines = useCallback(() => {
    for (const errorId of errorIds) {
      deleteSession(meta.id, errorId);
    }
    readSessions();
  }, [errorIds]);

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
          if (isSessionLoadFail(session)) {
            return (
              <SessionListLineError
                key={session.id}
                actions={actions}
                graphics={graphics}
                fail={session}
                meta={meta}
              />
            );
          }
          return (
            <SessionListItem
              key={session.id}
              session={session}
              graphics={graphics}
              actions={actions}
            />
          );
        })
      )}
      {errorIds.length > 0 && (
        <ButtonGroup>
          <Button
            onClick={purgeErrorLines}
            controlId="session-list-remove-error-lines-btn"
          >
            Remove corruped session saves
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};
