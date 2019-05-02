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
  icon: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** The height of current board */
  height: number;
  /** The width of current board */
  width: number;
  /** Current state of the piece (decides animation) */
  mode?: "normal" | "available" | "selected";
};

type PieceState = {
  pos: string;
};

/**
 * A component to show a playing piece icon. Used by the Piece component.
 */
export class Piece extends React.Component<PieceProps, PieceState> {
  constructor(props: PieceProps) {
    super(props);
    this.state = {
      pos: props.from || props.pos
    };
  }
  componentDidMount() {
    if (this.props.from) {
      setTimeout(() => {
        this.setState({ pos: this.props.pos });
      }, 10);
    }
  }
  componentDidUpdate(prevProps: PieceProps) {
    if (this.props.pos !== prevProps.pos) {
      this.setState({ pos: this.props.pos });
    }
  }
  render() {
    const { owner, icon, height, width, mode } = this.props;
    const { pos } = this.state;
    return (
      <div
        style={{
          ...positionStyles({ height, width, pos }),
          transition: "left 0.3s ease, bottom 0.3s ease",
          userSelect: "none",
          pointerEvents: "none"
        }}
      >
        <Icon icon={icon} owner={owner} mode={mode} />
      </div>
    );
  }
}
