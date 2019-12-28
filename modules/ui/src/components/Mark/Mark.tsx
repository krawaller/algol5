import React, { useCallback, CSSProperties } from "react";
import classnames from "classnames";
import { positionStyles } from "../../helpers";
import styles from "./Mark.css.js";

type MarkProps = {
  /** Height of board */
  height: number;
  /** Width of board */
  width: number;
  /** Whether or not the mark is potential (or selected) */
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
  return (
    <div
      onClick={handleClick}
      className={classnames(styles.mark, {
        [styles.potentialMark]: potential,
        [styles.pulsateMark]: potential && !piece,
      })}
      style={positionStyles({ height, width, pos })}
    />
  );
};
