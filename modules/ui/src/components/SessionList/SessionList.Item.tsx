import React, { FunctionComponent } from "react";

import { sprites2board } from "../../../../common/sprites/sprite.sprites2board";
import {
  AlgolSession,
  AlgolGameGraphics,
  AlgolVariantAnon,
} from "../../../../types";
import { Board } from "../Board";
import { SessionItemInfo } from "./SessionList.ItemInfo";
import { ListItem } from "../List";

type SessionListItemActions = {
  loadLocalSession: (sessionId: string) => void;
};

type SessionListItemProps = {
  session: AlgolSession;
  actions: SessionListItemActions;
  graphics: AlgolGameGraphics;
  variant: AlgolVariantAnon;
  corrupt?: string;
};

const EMPTYARR: string[] = [];

export const SessionListItem: FunctionComponent<SessionListItemProps> = props => {
  const { session, actions, graphics, variant, corrupt } = props;
  const board = sprites2board(session.sprites);
  const pic = (
    <Board
      graphics={graphics}
      potentialMarks={EMPTYARR}
      marks={board.marks}
      units={board.units}
      name={variant.board}
    />
  );
  const content = (
    <SessionItemInfo session={session} variant={variant} corrupt={corrupt} />
  );
  const onClick = () => {
    actions.loadLocalSession(session.id);
  };
  return <ListItem pic={pic} content={content} onClick={onClick} />;
};
