import * as React from "react";
import { GameId } from "../../games/dist/list";
import { AlgolBoardState } from "../../types";

import dataURIs from "../../graphics/dist/svgDataURIs";

type BoardProps = {
  gameId: GameId;
  state: AlgolBoardState;
};

export const Board: React.FunctionComponent<BoardProps> = ({ gameId }) => {
  const { dataURI, height, width } = dataURIs[gameId];
  return (
    <div
      style={{
        background: `url("${dataURI}")`,
        // hack to maintain aspect ratio of board
        paddingTop: `${((height + 1) / (width + 1)) * 100}%`
      }}
    />
  );
};
