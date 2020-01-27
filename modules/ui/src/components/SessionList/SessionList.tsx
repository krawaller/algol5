import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  AlgolGameGraphics,
  AlgolLocalBattle,
  AlgolMeta,
  AlgolErrorReporter,
} from "../../../../types";
import {
  getSessionList,
  isSessionLoadFail,
  deleteSession,
} from "../../../../local/src";
import { SessionListInner, SessionInfo } from "./SessionList.Inner";

export interface SessionListActions {
  loadLocalSession: (session: AlgolLocalBattle) => void;
  reportError: AlgolErrorReporter;
}

type SessionListProps = {
  graphics: AlgolGameGraphics;
  actions: SessionListActions;
  meta: AlgolMeta<string, string>;
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

  const innerActions = useMemo(
    () => ({
      ...actions,
      purgeErrorLines,
      updateList: readSessions,
    }),
    [purgeErrorLines]
  );

  return (
    <SessionListInner
      actions={innerActions}
      graphics={graphics}
      meta={meta}
      sessionInfo={sessionInfo}
    />
  );
};
