import * as React from "react";

import {
  AlgolUnitState,
  AlgolPosition,
  AlgolIcon,
  AlgolAnimCompiled
} from "../../../types";

import { TransitionGroup } from "react-transition-group";

import { Piece } from "../Piece";

import Transition, {
  TransitionStatus
} from "react-transition-group/Transition";

type BoardUnitsProps = {
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  anim?: AlgolAnimCompiled;
  height: number;
  width: number;
};

export class BoardUnits extends React.Component<BoardUnitsProps> {
  shownGhosts: AlgolAnimCompiled["ghosts"] = [];
  render() {
    const {
      marks,
      potentialMarks,
      units,
      anim = { enterFrom: {}, exitTo: {}, ghosts: [] },
      height,
      width
    } = this.props;
    if (anim.ghosts.length) {
      if (this.shownGhosts !== anim.ghosts) {
        this.shownGhosts = anim.ghosts;
        console.log("Rendering ghosts!");
        setTimeout(() => this.forceUpdate(), 40);
      } else {
        console.log("Rerendered again after ghosts to kill them off");
        this.shownGhosts = [];
      }
    }
    return (
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
        {this.shownGhosts.map(([ghostFrom, ghostTo, icon, owner]) => (
          <Transition
            key={`ghost_${ghostFrom}_${ghostTo}`}
            timeout={{ enter: 0, exit: 300 }}
            appear={true}
          >
            {(transition: TransitionStatus) => {
              const posToShow = transition === "entering" ? ghostFrom : ghostTo;
              return (
                <Piece
                  animating={"ghost"}
                  transition={transition}
                  icon={icon as AlgolIcon}
                  owner={owner}
                  pos={posToShow}
                  height={height}
                  width={width}
                  mode={"normal"}
                />
              );
            }}
          </Transition>
        ))}
      </TransitionGroup>
    );
  }
}
