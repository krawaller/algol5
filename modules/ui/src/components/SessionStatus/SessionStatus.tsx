import React, { FunctionComponent } from "react";
import { AlgolLocalBattle, AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";

type SessionStatusProps = {
  session: AlgolLocalBattle;
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
