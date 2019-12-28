import React, { Fragment } from "react";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import demos from "../../../../battle/dist/allDemos";
import boards from "../../../../graphics/dist/svgDataURIs";
import css from "./List.cssProxy";

import { ListItem } from "./List.Item";

export type ListItemWrapper = React.FunctionComponent<{ gameId: GameId }>;

const noop = () => {};
const DefaultWrapper: ListItemWrapper = ({ children }) => (
  <Fragment>{children}</Fragment>
);

type ListProps = {
  callback?: (id: GameId) => void;
  itemWrapper?: ListItemWrapper;
};

/**
 * A component to show a list of games
 */
export const List: React.FunctionComponent<ListProps> = ({
  callback = noop,
  itemWrapper = DefaultWrapper,
}) => {
  const Wrapper = itemWrapper;
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
