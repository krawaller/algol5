import React from "react";
import css from "./List.css.js";

import { Thumbnail } from "../Thumbnail";
import { AlgolMeta, AlgolDemo, AlgolGameGraphics } from "../../../../types";

type ListItemProps = {
  callback: () => void;
  demo: AlgolDemo;
  meta: AlgolMeta<any, any>;
  graphics: AlgolGameGraphics;
};

/**
 * A component to show a list of games
 */
export const ListItem: React.FunctionComponent<ListItemProps> = props => {
  const { callback, demo, meta, graphics } = props;
  return (
    <div className={css.gameListItem} key={meta.id} onClick={callback}>
      <Thumbnail demo={demo} gameId={meta.id} graphics={graphics} />

      <div className={css.gameListInfoBox}>
        <h4 className={css.gameListInfoTitle}>{meta.name}</h4>
        {meta.tagline}
      </div>
    </div>
  );
};
