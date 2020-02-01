import React, { useCallback, CSSProperties, useRef } from "react";
import classnames from "classnames";
import { positionStyles } from "../../helpers";
import styles from "./Mark.cssProxy";
import { allMarkDataURIs } from "../../../../graphics/dist/allMarkDataURIs";
import { useHover } from "../../helpers/useHover";

type MarkProps = {
  /** Height of board */
  height: number;
  /** Width of board */
  width: number;
  /** Whether or not the mark is potential (otherwise selected) */
  potential: boolean;
  /** The position of the mark (will be passed to callback) */
  pos: string;
  /** Whether there is a piece on the same spot */
  piece?: boolean;
  /** Callback to use when user clicks mark */
  callback: (pos: string) => void;
};

/**
 * Shows a mark or a potential mark on the board.
 */
export const Mark: React.FunctionComponent<MarkProps> = ({
  potential,
  pos,
  callback,
  height,
  width,
  piece,
}) => {
  const handleClick = useCallback(() => callback(pos), [pos]);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const bg =
    allMarkDataURIs[
      potential && isHovered
        ? "potentialHoverMark"
        : potential
        ? "potentialMark"
        : "selectedMark"
    ];
  return (
    <div
      ref={hoverRef}
      onClick={handleClick}
      className={classnames(styles.mark, {
        [styles.pulsateMark]: potential && !piece,
      })}
      style={{
        ...positionStyles({ height, width, pos }),
        backgroundImage: `url("${bg}")`,
      }}
    />
  );
};
