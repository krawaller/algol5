import React, { Fragment } from "react";
import { GameId, list } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import demos from "../../../battle/dist/allDemos";
import boards from "../../../graphics/dist/svgDataURIs";
import css from "./List.css.js";

import { ListItem } from "./List.Item";

type ListWrapper = React.FunctionComponent<{ gameId: GameId }>;

type ListProps = {
  callback: (id: GameId) => void;
  Wrapper?: ListWrapper;
};

/**
 * A component to show a list of games
 */
export const List: React.FunctionComponent<ListProps> = ({
  callback,
  Wrapper = ({ children }) => <Fragment>{children}</Fragment>,
}) => {
  return (
    <div className={css.gameList}>
      {list.map(gameId => (
        <Wrapper gameId={gameId} key={gameId}>
          <ListItem
            graphics={boards[gameId]}
            demo={demos[gameId]}
            meta={meta[gameId]}
            callback={() => callback(gameId)}
          />
        </Wrapper>
      ))}
    </div>
  );
};
