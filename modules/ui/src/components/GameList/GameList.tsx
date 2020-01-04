import React from "react";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import demos from "../../../../battle/dist/allDemos";
import boards from "../../../../graphics/dist/svgDataURIs";
import css from "./GameList.cssProxy";

import { GameListItem } from "./GameList.Item";

const noop = () => {};

export type GameListProps = {
  callback?: (id: GameId) => void;
};

/**
 * A component to show a list of games
 */
export const GameList: React.FunctionComponent<GameListProps> = ({
  callback = noop,
}) => {
  return (
    <div className={css.gameList}>
      {list.map(gameId => (
        <GameListItem
          key={gameId}
          graphics={boards[gameId]}
          demo={demos[gameId]}
          meta={meta[gameId]}
          callback={() => callback(gameId)}
        />
      ))}
    </div>
  );
};
