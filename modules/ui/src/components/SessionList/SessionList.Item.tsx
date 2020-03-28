import React, { FunctionComponent } from "react";

import css from "./SessionList.cssProxy";
import { sprites2board } from "../../../../common/sprites/sprite.sprites2board";
import {
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolVariantAnon,
} from "../../../../types";
import { Board } from "../Board";
import { SessionItemInfo } from "./SessionList.ItemInfo";

interface SessionListItemActions {
  loadLocalSession: (session: AlgolLocalBattle) => void;
}

type SessionListItemProps = {
  session: AlgolLocalBattle;
  actions: SessionListItemActions;
  graphics: AlgolGameGraphics;
  variant: AlgolVariantAnon;
};

const EMPTYARR: string[] = [];

export const SessionListItem: FunctionComponent<SessionListItemProps> = props => {
  const { session, actions, graphics, variant } = props;
  const board = sprites2board(session.sprites);
  return (
    <div
      key={session.id}
      className={css.sessionListItem}
      onClick={() => actions.loadLocalSession(session)}
      title="Click to load this session"
    >
      <div className={css.sessionListItemScreenshot}>
        <Board
          graphics={graphics}
          potentialMarks={EMPTYARR}
          marks={board.marks}
          units={board.units}
          name={variant.board}
        />
      </div>
      <SessionItemInfo session={session} variant={variant} />
    </div>
  );
};
