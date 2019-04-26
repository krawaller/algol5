import * as React from "react";
import { GameId } from "../../games/dist/list";
import { AlgolBoardState } from "../../types";

import dataURIs from "../../graphics/dist/svgDataURIs";

type BoardProps = {
  gameId: GameId;
  state: AlgolBoardState;
};

const minSide = 30;

export const Board: React.FunctionComponent<BoardProps> = ({ gameId }) => {
  const { dataURI, height, width } = dataURIs[gameId];
  return (
    <div
      style={{
        background: `url("${dataURI}")`,
        minHeight: minSide * (height + 1),
        minWidth: minSide * (width + 1),
        display: "inline-block"
      }}
    />
  );
};
