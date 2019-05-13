import * as React from "react";

import { AlgolDemo } from "../../types";

import { Board } from "./Board";

type DemoProps = {
  board: { height: number; width: number; dataURI: string };
  demo: AlgolDemo;
};

const noop = () => {};

export class Demo extends React.Component<DemoProps> {
  render() {
    return (
      <Board
        board={this.props.board}
        marks={[]}
        potentialMarks={[]}
        callback={noop}
        units={{}}
        anim={{ enterFrom: {}, exitTo: {}, ghosts: [] }}
      />
    );
  }
}
