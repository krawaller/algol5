import * as React from "react";

import { AlgolIcon, AlgolAnimCompiled } from "../../../types";

import { Piece } from "../Piece";

import { TransitionGroup } from "react-transition-group";

import Transition, {
  TransitionStatus
} from "react-transition-group/Transition";

type BoardGhostsProps = {
  ghosts: AlgolAnimCompiled["ghosts"];
  height: number;
  width: number;
};

export class BoardGhosts extends React.Component<BoardGhostsProps> {
  shownGhosts: AlgolAnimCompiled["ghosts"] = [];
  render() {
    const { ghosts, height, width, ...otherProps } = this.props;
    if (ghosts.length) {
      if (this.shownGhosts !== ghosts) {
        this.shownGhosts = ghosts;
        console.log("Rendering ghosts!");
        setTimeout(() => this.forceUpdate(), 40);
      } else {
        console.log("Rerendered again after ghosts to kill them off");
        this.shownGhosts = [];
      }
    }
    return (
      <TransitionGroup>
        {this.shownGhosts.map(([ghostFrom, ghostTo, icon, owner]) => (
          <Transition
            key={`ghost_${ghostFrom}_${ghostTo}`}
            timeout={{ enter: 0, exit: 300 }}
            appear={true}
            {...otherProps}
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
