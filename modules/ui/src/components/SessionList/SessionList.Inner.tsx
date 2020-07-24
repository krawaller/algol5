import React from "react";
import css from "./SessionList.cssProxy";

import {
  AlgolGameGraphics,
  AlgolMeta,
  AlgolError,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { SessionOrFail, isSessionLoadFail } from "../../../../local/src";
import { SessionListFullError } from "./SessionList.FullError";
import { SessionListLineError } from "./SessionList.LineError";
import { SessionListItem } from "./SessionList.Item";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

export interface SessionListInnerActions {
  loadLocalSession: (sessionId: string) => void;
  reportError: AlgolErrorReporter;
  updateList: () => void;
  purgeErrorLines: () => void;
}

type SessionListInnerProps = {
  graphics: AlgolGameGraphics;
  actions: SessionListInnerActions;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  sessionInfo: SessionInfo;
  variants: AlgolVariantAnon[];
};

export type SessionInfo = {
  sessions: SessionOrFail[];
  status: "initial" | "loaded" | "error";
  error?: AlgolError;
};

export const SessionListInner: React.FunctionComponent<SessionListInnerProps> = ({
  actions,
  graphics,
  meta,
  sessionInfo,
  variants,
}) => {
  if (sessionInfo.status === "initial") {
    return null;
  }
  if (sessionInfo.status === "error") {
    return (
      <SessionListFullError
        meta={meta}
        actions={actions}
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
                actions={actions}
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
                actions={actions}
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
          return (
            <SessionListItem
              key={session.id}
              session={session}
              graphics={graphics}
              actions={actions}
              variant={variants.find(v => v.code === session.variantCode)!}
            />
          );
        })
      )}
      {hasErrorLines && (
        <ButtonGroup>
          <Button
            onClick={actions.purgeErrorLines}
            controlId="session-list-remove-error-lines-btn"
          >
            Remove corruped session saves
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};
