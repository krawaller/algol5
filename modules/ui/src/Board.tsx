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

        <TransitionGroup
          childFactory={
            child =>
              React.cloneElement(child, {
                anim
              }) /* to ensure exiting comps get fresh anim */
          }
        >
          {Object.keys(units).map(id => (
            <Transition
              key={id}
              timeout={{ enter: 40, exit: 500 }}
              appear={true}
            >
              {(
                transition: TransitionStatus,
                { anim }: { anim: AlgolAnimCompiled }
              ) => {
                const { icon, owner, pos } = units[id];
                const posToShow =
                  (transition === "entering" && anim.enterFrom[pos]) ||
                  (transition === "exiting" && anim.exitTo[pos]) ||
                  pos;
                return (
                  <Piece
                    animating={
                      anim.enterFrom[pos]
                        ? "from"
                        : anim.exitTo[pos]
                        ? "to"
                        : undefined
                    }
                    transition={transition}
                    icon={icon as AlgolIcon}
                    owner={owner}
                    pos={posToShow}
                    height={height}
                    width={width}
                    mode={
                      marks.indexOf(pos) !== -1
                        ? "selected"
                        : potentialMarks.indexOf(pos) !== -1
                        ? "available"
                        : "normal"
                    }
                  />
                );
              }}
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};
