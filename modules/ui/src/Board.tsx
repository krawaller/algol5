import * as React from "react";
import { GameId } from "../../games/dist/list";
import {
  AlgolUnitState,
  AlgolPosition,
  AlgolIcon,
  AlgolAnimCompiled
} from "../../types";

import { TransitionGroup } from "react-transition-group";

import { Piece } from "./Piece";

import dataURIs from "../../graphics/dist/svgDataURIs";
import { Mark } from "./Mark";
import Transition, {
  TransitionStatus
} from "react-transition-group/Transition";

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
  const unitsByPos = Object.keys(units).reduce(
    (mem, id) => ({
      ...mem,
      [units[id].pos]: units[id]
    }),
    {}
  );
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
        {marks
          .map(pos => [pos, true])
          .concat(potentialMarks.map(pos => [pos, false]))
          .map(([pos, selected]: [string, boolean]) => (
            <Mark
              key={pos}
              callback={callback}
              pos={pos}
              potential={!selected}
              height={height}
              width={width}
              piece={!!unitsByPos[pos]}
            />
          ))}

        <TransitionGroup>
          {Object.keys(units).map(id => (
            <Transition
              key={id}
              timeout={{ enter: 40, exit: 4000 }}
              appear={true}
            >
              {(transition: TransitionStatus) => (
                <Piece
                  animating={
                    anim.enterFrom[units[id].pos]
                      ? "from"
                      : anim.exitTo[units[id].pos]
                      ? "to"
                      : undefined
                  }
                  transition={transition}
                  icon={units[id].icon as AlgolIcon}
                  owner={units[id].owner}
                  pos={
                    (transition === "entering" &&
                      anim.enterFrom[units[id].pos]) ||
                    units[id].pos
                  }
                  height={height}
                  width={width}
                  mode={
                    marks.indexOf(units[id].pos) !== -1
                      ? "selected"
                      : potentialMarks.indexOf(units[id].pos) !== -1
                      ? "available"
                      : "normal"
                  }
                />
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};
