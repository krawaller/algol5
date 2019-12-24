import React, { memo } from "react";

import {
  AlgolUnitState,
  AlgolPosition,
  AlgolAnimCompiled,
  AlgolGameGraphics,
} from "../../../types";
import { emptyAnim } from "../../../common";

import { BoardMarks } from "./BoardMarks";
import { BoardUnits } from "./BoardUnits";
import { BoardGhosts } from "./BoardGhosts";

type BoardProps = {
  graphics: AlgolGameGraphics;
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  callback: (pos: string) => void;
  anim?: AlgolAnimCompiled;
  lookback?: boolean;
};

const EMPTYARR: any[] = [];

export const Board: React.FunctionComponent<BoardProps> = memo(
  ({
    graphics,
    marks,
    potentialMarks,
    units,
    callback,
    lookback,
    anim = emptyAnim,
  }) => {
    const { dataURI, height, width, icons } = graphics;
    return (
      <div
        style={{
          background: `url("${dataURI}")`,
          backgroundRepeat: "no-repeat",
          // maintain aspect ratio of board by exploiting that % in padding-top/bottom refers to width
          paddingTop: `${((height + 1) / (width + 1)) * 100}%`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <BoardMarks
            callback={callback}
            width={width}
            height={height}
            marks={lookback ? EMPTYARR : marks}
            potentialMarks={lookback ? EMPTYARR : potentialMarks}
            units={units}
          />

          <BoardUnits
            width={width}
            height={height}
            marks={marks}
            potentialMarks={potentialMarks}
            units={units}
            anim={anim}
            iconMapper={icons}
          />

          <BoardGhosts width={width} height={height} ghosts={anim.ghosts} />
        </div>
      </div>
    );
  }
);
