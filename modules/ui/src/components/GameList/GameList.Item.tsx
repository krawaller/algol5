import React from "react";
import css from "./GameList.cssProxy";

import { Thumbnail } from "../Thumbnail";
import { AlgolMeta, AlgolDemo, AlgolGameGraphics } from "../../../../types";

type GameListItemProps = {
  callback: () => void;
  demo: AlgolDemo;
  meta: AlgolMeta<any, any>;
  graphics: AlgolGameGraphics;
};

export const GameListItem: React.FunctionComponent<GameListItemProps> = props => {
  const { callback, demo, meta, graphics } = props;
  return (
    <div className={css.gameListItem} key={meta.id} onClick={callback}>
      <div>
        <Thumbnail demo={demo} gameId={meta.id} graphics={graphics} />
      </div>
      <div className={css.gameListInfoBox}>
        <h4 className={css.gameListInfoTitle}>{meta.name}</h4>
        {meta.tagline}
      </div>
    </div>
  );
};
