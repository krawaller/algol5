import React, { CSSProperties, FunctionComponent } from "react";
import { Icon } from "./Icon";
import { AlgolIcon } from "../../types";
import { positionStyles } from "./helpers";
import { TransitionStatus } from "react-transition-group/Transition";

type PieceProps = {
  /** tells if we are being animated */
  animating?: "from" | "to" | "ghost";
  /** The name of the current position */
  pos: string;
  /** Which type of piece it is */
  icon: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** The height of current board */
  height: number;
  /** The width of current board */
  width: number;
  /** Current UI state of the piece (decides animation) */
  mode?: "normal" | "available" | "selected";
  /** Current Transition state of the piece (enter/exit anim) */
  transition: TransitionStatus;
};

function lifecycleStyles(
  status: TransitionStatus,
  animating?: "from" | "to" | "ghost"
): CSSProperties {
  if (status === "entering" && animating !== "from") {
    return {
      opacity: 0,
      transform: "scale(0.1, 0.1)"
    };
  }
  if (status === "exiting") {
    return {
      opacity: 0,
      ...(animating !== "to" && { transform: "scale(2, 2)" })
    };
  }
  return {};
}

function transitions(status: TransitionStatus) {
  const transitions = ["left 0.3s ease", "bottom 0.3s ease"];
  if (status !== "entering") {
    transitions.push("opacity 0.4s ease");
    transitions.push("transform 0.4s ease");
  }
  return transitions.join(", ");
}

const pieceStyles: CSSProperties = {
  userSelect: "none",
  pointerEvents: "none"
};

/**
 * A component to show a playing piece icon. Used by the Piece component.
 */
export const Piece: FunctionComponent<PieceProps> = props => {
  const {
    owner,
    icon,
    height,
    width,
    mode,
    pos,
    animating,
    transition
  } = props;
  return (
    <div
      style={{
        ...positionStyles({
          height,
          width,
          pos
        }),
        ...lifecycleStyles(transition, animating),
        ...pieceStyles,
        transition: transitions(transition)
      }}
    >
      <Icon icon={icon} owner={owner} mode={animating ? "normal" : mode} />
    </div>
  );
};
