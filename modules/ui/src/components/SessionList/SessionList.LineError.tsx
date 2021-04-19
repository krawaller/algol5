import React from "react";
import {
  AlgolGameGraphics,
  decorateError,
  AlgolMeta,
  AlgolGameBlobAnon,
} from "../../../../types";
import css from "./SessionList.cssProxy";
import { Board } from "../Board";
import { ListItem } from "../List";
import { useAppActions } from "../../contexts";
import { SessionContainer } from "../../../../local/expose";

type SessionListLineErrorProps = {
  fail: SessionContainer;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<AlgolGameBlobAnon>;
};

const EMPTYARR: string[] = [];
const EMPTYOBJ = {};

// TODO - button to purge corrupt save data?
// TODO - preserve more metadata about error. we need the original save string and game id

export const SessionListLineError = (props: SessionListLineErrorProps) => {
  const { fail, graphics, meta } = props;
  const appActions = useAppActions();
  const onClick = () =>
    appActions.reportError(
      decorateError({
        err: fail.error!,
        description: `Something has happened to this ${meta.name} save file, and it couldn't be correctly read.`,
        errorId: "local-save-parse-error",
        meta: {
          gameId: meta.id,
          saveStr: fail.error!.message,
          saveId: fail.id,
        },
      }),
      "severe"
    );
  const pic = (
    <Board
      graphics={graphics}
      potentialMarks={EMPTYARR}
      marks={EMPTYARR}
      units={EMPTYOBJ}
    />
  );
  const content = (
    <div className={css.sessionListItemErrorInfo}>
      The save data for this session is corrupt :/
    </div>
  );
  return <ListItem pic={pic} content={content} onClick={onClick} />;
};
