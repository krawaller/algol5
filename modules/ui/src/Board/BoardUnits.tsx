import * as React from "react";

import {
  AlgolUnitState,
  AlgolPosition,
  AlgolIcon,
  AlgolAnimCompiled,
} from "../../../types";

import { TransitionGroup } from "react-transition-group";

import { Piece } from "../Piece";

import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";

type BoardUnitsProps = {
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  anim?: AlgolAnimCompiled;
  height: number;
  width: number;
};

export const BoardUnits: React.FunctionComponent<BoardUnitsProps> = ({
  marks,
  potentialMarks,
  units,
  anim = { enterFrom: {}, exitTo: {}, ghosts: [] },
  height,
  width,
}) => {
  const targets = anim.ghosts
    .map(([from, to]) => to)
    .concat(Object.values(anim.exitTo))
    .reduce((mem, t) => ({ ...mem, [t]: true }), {} as {
      [pos: string]: boolean;
    });
  return (
    <TransitionGroup
      childFactory={
        child =>
          React.cloneElement(child, {
            anim,
          }) /* to ensure exiting comps get fresh anim */
      }
    >
      {Object.values(units).map(({ icon, owner, pos, id }) => (
        <Transition
          key={id}
          timeout={{ enter: 40, exit: 500 + (targets[pos] ? 0 : 0) }}
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
            // short-cirquit initial buggy "exit" render that messes up enter animations
            if (transition === "exited" && anim.enterFrom[pos]) {
              return null;
            }
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
                targetted={targets[pos]}
              />
            );
          }}
        </Transition>
      ))}
    </TransitionGroup>
  );
};
