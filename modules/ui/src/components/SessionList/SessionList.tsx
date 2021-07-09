import React, { useCallback } from "react";
import css from "./SessionList.cssProxy";

import { GameSessions, localSessionActions } from "../../../../local/expose";
import { SessionListFullError } from "./SessionList.FullError";
import { SessionListLineError } from "./SessionList.LineError";
import { SessionListItem } from "./SessionList.Item";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { useGamePayload } from "../../contexts";

type SessionListProps = {
  sessionInfo: GameSessions;
};

export const SessionList = (props: SessionListProps) => {
  const { api, meta, graphics } = useGamePayload();
  const { sessionInfo } = props;

  // TODO - act different if remote
  const wipe = useCallback(
    () => localSessionActions.deleteGameSessions(api.gameId),
    [api]
  );

  if (!sessionInfo || sessionInfo.retrieved === false) {
    return null;
  }
  if (sessionInfo.retrieved instanceof Error) {
    return (
      <SessionListFullError
        meta={meta}
        wipe={wipe}
        error={sessionInfo.retrieved}
      />
    );
  }

  let hasErrorLines = false;

  const containers = Object.values(sessionInfo.containers);

  return (
    <div>
      {containers.length === 0 ? (
        <div className={css.sessionListEmpty}>No saved sessions found</div>
      ) : (
        containers.map(container => {
          if (!container.session) {
            hasErrorLines = true;
            return (
              <SessionListLineError
                key={container.id}
                graphics={graphics}
                fail={container}
                meta={meta}
              />
            );
          }
          if (container.error) {
            hasErrorLines = true;
          }
          return (
            <SessionListItem
              key={container.id}
              session={container.session}
              graphics={graphics}
              variant={
                api.variants.find(
                  v => v.code === container.session!.variantCode
                )!
              }
              error={container.error}
            />
          );
        })
      )}
      {hasErrorLines && (
        <ButtonGroup>
          <Button
            onClick={wipe}
            controlId="session-list-remove-error-lines-btn"
          >
            Remove corruped session saves
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};
