import React from "react";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { BattleMove } from "../BattleMove";
import { getCurrentPlr, isWaitingForRemote } from "../../../../common";
import { getLatestSessionIdForGame } from "../../../../local/expose";
import { BattleMode } from "../../contexts";
import {
  BattleActions,
  BattleHookState,
} from "./GamePage.useBattleActionsAndState";
import { AlgolBattleUI, AlgolGamePayload } from "../../../../types";
import css from "./GamePage.cssProxy";

type GamePageBodyProps = {
  mode: BattleMode;
  ui: AlgolBattleUI;
  battleActions: BattleActions;
  gamePayload: AlgolGamePayload;
  battleState: BattleHookState;
};

export const GamePageBody = (props: GamePageBodyProps) => {
  const { mode, ui, battleActions, gamePayload, battleState } = props;
  const { frame, battle, session } = battleState;
  const { api, graphics, meta, rules } = gamePayload;

  // TODO - maybe not read this on every render? move to state somewhere?
  const previousSessionId = getLatestSessionIdForGame(api.gameId);

  if (battleState.loading === "session") {
    return <div className={css.centerBox}>...loading...</div>;
  }

  if (mode === "history") {
    // We are currently watching the history of a battle
    return (
      <BattleHistory
        content={ui.instruction}
        frame={Math.max(0, frame)}
        toFrame={battleActions.toFrame}
        battle={battle!}
      />
    );
  } else if (mode === "battlelobby") {
    // we are on the landing page for a created/loaded session
    return (
      <BattleLanding
        battle={battle!}
        session={session!}
        meta={meta}
        manyVariants={api.variants.length > 1}
      />
    );
  } else if (mode === "playing") {
    if (isWaitingForRemote(session)) {
      return (
        <div className={css.centerBox}>
          ...waiting for {getCurrentPlr(session)?.name}...
        </div>
      );
    }

    // We are actively playing an ongoing battle
    return <BattleMove actions={battleActions} ui={ui} rules={rules} />;
  } else {
    // No battle active, we're just at the game landing page
    return (
      <GameLanding
        meta={meta}
        graphics={graphics}
        previousSessionId={previousSessionId}
        variants={api.variants}
      />
    );
  }
};
