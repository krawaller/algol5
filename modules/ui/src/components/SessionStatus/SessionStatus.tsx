import React, { FunctionComponent } from "react";
import { AlgolSession, AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";

type SessionStatusProps = {
  session: AlgolSession;
};

export const SessionStatus: FunctionComponent<SessionStatusProps> = ({
  session,
}) => {
  const content: AlgolContentAnon = session.endedBy
    ? {
        line: [
          { text: `Ended in turn ${session.turn} by ` },
          { bold: session.endedBy },
          ...(session.player
            ? [{ text: ", " }, { player: session.player }, { text: " wins!" }]
            : [{ text: " in a draw!" }]),
        ],
      }
    : {
        line: [
          { text: `Turn ${session.turn}, ` },
          { player: session.player },
          { text: " to play" },
        ],
      };
  return <Content content={content} />;
};
