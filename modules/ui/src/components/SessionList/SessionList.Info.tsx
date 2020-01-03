import React, { FunctionComponent } from "react";
import { AlgolLocalBattle, AlgolContentAnon } from "../../../../types";
import css from "./SessionList.cssProxy";
import { Content } from "../Content";

type SessionInfoProps = {
  session: AlgolLocalBattle;
};

export const SessionInfo: FunctionComponent<SessionInfoProps> = ({
  session,
}) => {
  const content: AlgolContentAnon = session.endedBy
    ? {
        line: [
          { text: "Ended by " },
          { bold: session.endedBy },
          ...(session.player
            ? [{ text: ", " }, { player: session.player }, { text: " wins!" }]
            : [{ text: " in a draw!" }]),
        ],
      }
    : {
        line: [{ player: session.player }, { text: " to play" }],
      };
  return (
    <div className={css.sessionListInfo}>
      Created: {new Date(session.created).toString().slice(0, 10)}
      <br />
      Updated: {new Date(session.updated).toString().slice(0, 10)}
      <br />
      Turn: {session.turn}
      <br />
      <Content content={content} />
    </div>
  );
};
