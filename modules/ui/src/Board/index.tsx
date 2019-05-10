import * as React from "react";
import { GameId } from "../../../games/dist/list";
import {
  AlgolUnitState,
  AlgolPosition,
  AlgolAnimCompiled
} from "../../../types";

import dataURIs from "../../../graphics/dist/svgDataURIs";
import { BoardMarks } from "./BoardMarks";
import { BoardUnits } from "./BoardUnits";
import { BoardGhosts } from "./BoardGhosts";

type BoardProps = {
  gameId: GameId;
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  callback: (pos: string) => void;
  anim?: AlgolAnimCompiled;
};

export const Board: React.FunctionComponent<BoardProps> = ({
  gameId,
  marks,
  potentialMarks,
  units,
  callback,
  anim = { enterFrom: {}, exitTo: {}, ghosts: [] }
}) => {
  const { dataURI, height, width } = dataURIs[gameId];
  return (
    <div
      style={{
        background: `url("${dataURI}")`,
        // maintain aspect ratio of board by exploiting that % in padding-top/bottom refers to width
        paddingTop: `${((height + 1) / (width + 1)) * 100}%`,
        position: "relative"
      }}
    >
      <div
        style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
      >
        <BoardMarks
          callback={callback}
          width={width}
          height={height}
          marks={marks}
          potentialMarks={potentialMarks}
          units={units}
        />

        <BoardUnits
          width={width}
          height={height}
          marks={marks}
          potentialMarks={potentialMarks}
          units={units}
          anim={anim}
        />

        <BoardGhosts width={width} height={height} ghosts={anim.ghosts} />
      </div>
    </div>
  );
};
