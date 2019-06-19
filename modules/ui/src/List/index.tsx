import * as React from "react";
import { GameId, list } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import demos from "../../../battle/dist/allDemos";
import boards from "../../../graphics/dist/svgDataURIs";

import { Demo } from "../Demo";

type ListProps = {
  callback: (id: GameId) => void;
};

import { styles, listItemHeight } from "./List.styles";

/**
 * A component to show a list of games
 */
export const List: React.FunctionComponent<ListProps> = ({ callback }) => {
  return (
    <ul style={styles.ul}>
      {list.map(gameId => (
        <li style={styles.li} key={gameId}>
          <div
            style={{
              ...styles.boardBox,
              width:
                listItemHeight *
                ((boards[gameId].width + 1) / (boards[gameId].height + 1)),
            }}
          >
            {/* <Demo demo={demos[gameId]} board={boards[gameId]} /> */}
          </div>
          <div style={styles.infoBox}>
            <h4 style={styles.title}>{meta[gameId].name}</h4>
            {meta[gameId].tagline}
          </div>
        </li>
      ))}
    </ul>
  );
};
