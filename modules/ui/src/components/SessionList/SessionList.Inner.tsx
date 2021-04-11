import React from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolGameGraphics,
  AlgolMeta,
  AlgolError,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { SessionOrFail, isSessionLoadFail } from "../../../../local/src";
import { SessionListFullError } from "./SessionList.FullError";
import { SessionListLineError } from "./SessionList.LineError";
import { SessionListItem } from "./SessionList.Item";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

type SessionListInnerProps = {
  graphics: AlgolGameGraphics;
  updateList: () => void;
  purgeErrorLines: () => void;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  sessionInfo: SessionInfo;
  corruptSessions: Record<string, string>;
  variants: AlgolVariantAnon[];
};

export type SessionInfo = {
  sessions: SessionOrFail[];
  status: "initial" | "loaded" | "error";
  error?: AlgolError;
};

export const SessionListInner: React.FunctionComponent<SessionListInnerProps> = ({
  updateList,
  purgeErrorLines,
  graphics,
  meta,
  sessionInfo,
  variants,
  corruptSessions,
}) => {
  if (sessionInfo.status === "initial") {
    return null;
  }
  if (sessionInfo.status === "error") {
    return (
      <SessionListFullError
        meta={meta}
        updateList={updateList}
        error={sessionInfo.error!}
      />
    );
  }

  let hasErrorLines = false;

  return (
    <div>
      {sessionInfo.sessions.length === 0 ? (
        <div className={css.sessionListEmpty}>No saved sessions found</div>
      ) : (
        sessionInfo.sessions.map(session => {
          if (isSessionLoadFail(session)) {
            hasErrorLines = true;
            return (
              <SessionListLineError
                key={session.id}
                graphics={graphics}
                fail={session}
                meta={meta}
              />
            );
          }
          const variant = variants.find(v => v.code === session.variantCode);
          if (!variant) {
            hasErrorLines = true;
            return (
              <SessionListLineError
                key={session.id}
                graphics={graphics}
                fail={{
                  error: new Error("Unknown variant"),
                  id: session.id,
                  str: "",
                }}
                meta={meta}
              />
            );
          }
          if (corruptSessions[session.id]) {
            hasErrorLines = true;
          }
          return (
            <SessionListItem
              key={session.id}
              session={session}
              graphics={graphics}
              variant={variants.find(v => v.code === session.variantCode)!}
              corrupt={corruptSessions[session.id]}
            />
          );
        })
      )}
      {hasErrorLines && (
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
