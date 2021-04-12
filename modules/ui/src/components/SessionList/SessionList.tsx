import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  AlgolGameGraphics,
  AlgolMeta,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import {
  getSessionList,
  isSessionLoadFail,
  deleteSession,
} from "../../../../local/src";
import { SessionListInner, SessionInfo } from "./SessionList.Inner";

type SessionListProps = {
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  variants: AlgolVariantAnon[];
  corruptSessions: Record<string, string>;
};

/**
 * A component to show a list of sessions
 */
export const SessionList: React.FunctionComponent<SessionListProps> = ({
  graphics,
  meta,
  variants,
  corruptSessions,
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
    () =>
      sessionInfo.sessions
        .filter(
          s =>
            isSessionLoadFail(s) ||
            !variants.find(v => v.code === s.variantCode) ||
            corruptSessions[s.id]
        )
        .map(fail => fail.id),
    [sessionInfo]
  );

  const purgeErrorLines = useCallback(() => {
    for (const errorId of errorIds) {
      deleteSession(meta.id, errorId);
    }
    readSessions();
  }, [errorIds]);

  return (
    <SessionListInner
      purgeErrorLines={purgeErrorLines}
      updateList={readSessions}
      graphics={graphics}
      meta={meta}
      sessionInfo={sessionInfo}
      variants={variants}
      corruptSessions={corruptSessions}
    />
  );
};
