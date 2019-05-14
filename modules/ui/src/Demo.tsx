import * as React from "react";
import * as jdp from "jsondiffpatch";
import {
  AlgolDemo,
  AlgolArmy,
  AlgolHydratedDemo,
  AlgolAnimCompiled
} from "../../types";

import { Board } from "./Board";

type DemoProps = {
  board: { height: number; width: number; dataURI: string };
  demo: AlgolDemo;
};

type DemoState = {
  n: number;
  demo?: AlgolHydratedDemo;
};

const noop = () => {};
const emptyAnim: AlgolAnimCompiled = { enterFrom: {}, exitTo: {}, ghosts: [] };

function inflateDemo(demo: AlgolDemo): AlgolHydratedDemo {
  const positions: AlgolArmy[] = [demo.initial];
  let current = demo.initial;
  for (const delta of demo.patches) {
    positions.push(
      (current = jdp.patch(JSON.parse(JSON.stringify(current)), delta))
    );
  }
  return { positions, anims: demo.anims };
}

export class Demo extends React.Component<DemoProps, DemoState> {
  state = {
    n: 0,
    demo: undefined
  } as DemoState;
  timeout: number;
  inflateDemo = () => {
    this.setState({ demo: inflateDemo(this.props.demo) });
    this.timeout = (setTimeout(this.step, 1000) as unknown) as number;
  };
  step = () => {
    this.setState({
      n:
        (this.state.n + 1) %
        ((this.state.demo as unknown) as AlgolHydratedDemo).positions.length
    });
    this.timeout = (setTimeout(this.step, 1000) as unknown) as number;
  };
  componentDidMount() {
    setTimeout(this.inflateDemo);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    let army: AlgolArmy, anim: AlgolAnimCompiled;
    if (!this.state.demo) {
      army = this.props.demo.initial;
      anim = emptyAnim;
    } else {
      army = this.state.demo.positions[this.state.n];
      anim = {
        ...emptyAnim,
        ...this.state.demo.anims[this.state.n]
      };
    }
    return (
      <Board
        board={this.props.board}
        marks={[]}
        potentialMarks={[]}
        callback={noop}
        units={army}
        anim={anim}
      />
    );
  }
}
