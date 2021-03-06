import React, { FunctionComponent, Fragment } from "react";
import { AlgolSession, AlgolVariantAnon } from "../../../../types";
import css from "./SessionList.cssProxy";
import { SessionStatus } from "../SessionStatus";

type SessionItemInfoProps = {
  session: AlgolSession;
  variant: AlgolVariantAnon;
  corrupt?: string;
};

export const SessionItemInfo: FunctionComponent<SessionItemInfoProps> = ({
  session,
  variant,
  corrupt,
}) => {
  return (
    <div className={css.sessionListInfo}>
      {variant.desc[0].toUpperCase()}
      {variant.desc.slice(1)} battle ID {session.id}
      <br />
      {session.type === "fork"
        ? "Forked"
        : session.type === "imported"
        ? "Imported"
        : "Created"}
      : {new Date(session.created).toString().slice(0, 10)}
      <br />
      {session.updated && (
        <Fragment>
          Updated: {new Date(session.updated!).toString().slice(0, 10)}
          <br />
        </Fragment>
      )}
      {corrupt ? (
        <div className={css.sessionListItemErrorInfo}>{corrupt}</div>
      ) : (
        <SessionStatus session={session} />
      )}
    </div>
  );
};
