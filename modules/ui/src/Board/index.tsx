import * as React from "react";
import { GameId } from "../../../games/dist/list";
import {
  AlgolUnitState,
  AlgolPosition,
  AlgolIcon,
  AlgolAnimCompiled
} from "../../../types";

import { TransitionGroup } from "react-transition-group";

import { Piece } from "../Piece";

import dataURIs from "../../../graphics/dist/svgDataURIs";
import { BoardMarks } from "./BoardMarks";
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

        <TransitionGroup
          childFactory={
            child =>
              React.cloneElement(child, {
                anim
              }) /* to ensure exiting comps get fresh anim */
          }
        >
          {Object.keys(units)
            .map(id => units[id])
            .map(({ icon, owner, pos, id }) => (
              <Transition
                key={id}
                timeout={{ enter: 40, exit: 500 }}
                appear={true}
              >
                {(
                  transition: TransitionStatus,
                  { anim }: { anim: AlgolAnimCompiled }
                ) => {
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
