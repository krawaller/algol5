import React, { FunctionComponent } from "react";
import { AlgolLocalBattle } from "../../../../types";
import css from "./SessionList.cssProxy";
import { SessionStatus } from "../SessionStatus";

type SessionInfoProps = {
  session: AlgolLocalBattle;
};

export const SessionInfo: FunctionComponent<SessionInfoProps> = ({
  session,
}) => {
  return (
    <div className={css.sessionListInfo}>
      ID: {session.id}
      <br />
      {session.type === "fork" ? "Forked" : "Created"}:{" "}
      {new Date(session.created).toString().slice(0, 10)}
      <br />
      Updated: {new Date(session.updated!).toString().slice(0, 10)}
      <br />
      <SessionStatus session={session} />
    </div>
  );
};
