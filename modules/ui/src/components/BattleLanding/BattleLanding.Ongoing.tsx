import React, { FunctionComponent, Fragment } from "react";
import { AlgolLocalBattle, AlgolVariantAnon } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

type BattleLandingOngoing = {
  session: AlgolLocalBattle;
  variant: AlgolVariantAnon;
  manyVariants?: boolean;
  gameName: string;
};

export const BattleLandingOngoing: FunctionComponent<BattleLandingOngoing> = props => {
  const { session, variant, manyVariants, gameName } = props;
  return (
    <Fragment>
      <p>
        This {manyVariants ? variant.desc + " variant" : ""} {gameName} battle
        with id <code>{session.id}</code> was{" "}
        {session.type === "normal"
          ? "created"
          : session.type === "fork"
          ? "forked"
          : "imported"}{" "}
        {stamptoStr(session.created)}
        {session.updated &&
          stamptoStr(session.updated) !== stamptoStr(session.created) && (
            <Fragment> and updated {stamptoStr(session.updated)}</Fragment>
          )}
        . <SessionStatus session={session} />.
      </p>
    </Fragment>
  );
};

const stamptoStr = (stamp: number) => new Date(stamp).toString().slice(0, 10);
