import * as React from "react";
import { Icon } from "./Icon";
import { AlgolIcon } from "../../types";
import { positionStyles } from "./helpers";

type PieceProps = {
  /** The name of position we should animate from */
  from?: string;
  /** The name of the current position */
  pos: string;
  /** Which type of piece it is */
  group: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** The height of current board */
  height: number;
  /** The width of current board */
  width: number;
};

/**
 * A component to show a playing piece icon. Used by the Piece component.
 */
export const Piece: React.FunctionComponent<PieceProps> = ({
  owner,
  group,
  height,
  width,
  pos
}) => {
  return (
    <div
      style={{
        ...positionStyles({ height, width, pos }),
        transition: "left 0.3s ease, bottom 0.3s ease",
        userSelect: "none",
        pointerEvents: "none"
      }}
    >
      <Icon icon={group} owner={owner} />
    </div>
  );
};
