import * as React from "react";
import { GameId, list } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import demos from "../../../battle/dist/allDemos";
import boards from "../../../graphics/dist/svgDataURIs";
import css from "./List.css.js";

import { Thumbnail } from "../Thumbnail";

type ListProps = {
  callback: (id: GameId) => void;
};

/**
 * A component to show a list of games
 */
export const List: React.FunctionComponent<ListProps> = ({ callback }) => {
  return (
    <ul className={css.gameList}>
      {list.map(gameId => (
        <li
          className={css.gameListItem}
          key={gameId}
          onClick={() => callback(gameId)}
        >
          <Thumbnail
            demo={demos[gameId]}
            gameId={gameId}
            graphics={boards[gameId]}
            playing={true}
          />

          <div className={css.gameListInfoBox}>
            <h4 className={css.gameListInfoTitle}>{meta[gameId].name}</h4>
            {meta[gameId].tagline}
          </div>
        </li>
      ))}
    </ul>
  );
};
