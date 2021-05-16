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
import { useLocalBattleActions } from "../../contexts";

type SessionListItemProps = {
  session: AlgolSession;
  graphics: AlgolGameGraphics;
  variant: AlgolVariantAnon;
  error?: Error | null;
};

const EMPTYARR: string[] = [];

export const SessionListItem: FunctionComponent<SessionListItemProps> = props => {
  const { session, graphics, variant, error } = props;
  const localBattleActions = useLocalBattleActions();
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
    <SessionItemInfo
      session={session}
      variant={variant}
      corrupt={error?.message}
    />
  );
  const onClick = () => {
    localBattleActions.loadLocalSession(session.id);
  };
  return <ListItem pic={pic} content={content} onClick={onClick} />;
};
