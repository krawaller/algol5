import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle } from "../../../../types";

interface BattleLandingActions {
  toHistory: () => void;
  toBattleControls: () => void;
}

type BattleLandingProps = {
  actions: BattleLandingActions;
  session: AlgolLocalBattle;
  haveHistory: boolean;
};

export const BattleLanding: FunctionComponent<BattleLandingProps> = props => {
  const { session, actions, haveHistory } = props;
  return (
    <Fragment>
      <div>Created: {new Date(session.created).toString().slice(0, 10)}</div>
      <button disabled={!haveHistory} onClick={actions.toHistory}>
        See history
      </button>
      {!session.endedBy && (
        <button onClick={actions.toBattleControls}>Play!</button>
      )}
    </Fragment>
  );
};
