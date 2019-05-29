import React, { FunctionComponent } from "react";
import { Icon } from "../Icon";
import { AlgolIcon } from "../../../types";
import { positionStyles } from "../_helpers";
import { TransitionStatus } from "react-transition-group/Transition";

import { lifecycleStyles, pieceStyles, transitions } from "./Piece.styles";

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
  /** Whether this position was the target of exitTo/ghost projectile */
  targetted?: boolean;
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
    transition,
    targetted
  } = props;
  return (
    <div
      style={{
        ...positionStyles({
          height,
          width,
          pos
        }),
        ...lifecycleStyles(transition, animating, targetted),
        ...pieceStyles,
        transition: transitions(transition)
      }}
    >
      <Icon icon={icon} owner={owner} mode={animating ? "normal" : mode} />
    </div>
  );
};
