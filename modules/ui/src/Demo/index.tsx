import * as React from "react";
import {
  AlgolDemoControl,
  AlgolDemo,
  AlgolAnimCompiled,
  AlgolArmy
} from "algol-types";

import { Board } from "../Board";

import { playDemo } from "algol-common";

type DemoProps = {
  demo: AlgolDemo;
  board: { height: number; width: number; dataURI: string };
};
type DemoState = {
  marks: string[];
  potentialMarks: string[];
  units: AlgolArmy;
  anim: AlgolAnimCompiled;
};

export class Demo extends React.Component<DemoProps, DemoState> {
  stopDemo: AlgolDemoControl["stop"];
  constructor(props: DemoProps) {
    super(props);
    const { stop, initial } = playDemo(props.demo, cur => {
      this.setState({ units: cur.army, anim: cur.anim });
    });
    this.stopDemo = stop;
    this.state = {
      marks: [],
      potentialMarks: [],
      units: initial.army,
      anim: initial.anim
    };
  }
  componentWillUnmount() {
    this.stopDemo();
  }
  handleBoardClick = () => {};
  render() {
    const { marks, potentialMarks, units, anim } = this.state;
    return (
      <Board
        board={this.props.board}
        marks={marks}
        potentialMarks={potentialMarks}
        callback={this.handleBoardClick}
        units={units}
        anim={anim}
      />
    );
  }
}
