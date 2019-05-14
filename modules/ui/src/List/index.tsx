import * as React from "react";
import { GameId, list } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import demos from "../../../battle/dist/allDemos";
import boards from "../../../graphics/dist/svgDataURIs";
import {} from "../../../types";

import { Demo } from "../Demo";

type ListProps = {
  callback: (id: GameId) => void;
};

const listItemHeight = 120;

const styles: { [name: string]: React.CSSProperties } = {
  ul: {
    listStyleType: "none",
    paddingLeft: 0
  },
  li: {
    height: listItemHeight,
    position: "relative",
    marginBottom: "10px",
    cursor: "pointer",
    userSelect: "none"
  },
  boardBox: {
    float: "left",
    height: listItemHeight,
    position: "relative",
    marginRight: "10px"
  },
  infoBox: {
    margin: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontFamily: "verdana",
    fontWeight: "normal",
    fontSize: "30px",
    marginTop: 0,
    marginBottom: "10px"
  }
};

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
                ((boards[gameId].width + 1) / (boards[gameId].height + 1))
            }}
          >
            <Demo demo={demos[gameId]} board={boards[gameId]} />
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
