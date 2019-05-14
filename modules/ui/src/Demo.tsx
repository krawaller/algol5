import * as React from "react";
import {
  AlgolDemoControl,
  AlgolDemo,
  AlgolAnimCompiled,
  AlgolArmy
} from "../../types";

import { Board } from "./Board";

import { playDemo } from "../../common";

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
  stop: AlgolDemoControl["stop"];
  constructor(props: DemoProps) {
    super(props);
    const { stop, initial } = playDemo(props.demo, cur => {
      this.setState({ units: cur.army, anim: cur.anim });
    });
    this.stop = stop;
    this.state = {
      marks: [],
      potentialMarks: [],
      units: initial.army,
      anim: initial.anim
    };
  }
  componentWillUnmount() {
    this.stop();
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
