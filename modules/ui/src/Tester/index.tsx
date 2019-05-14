import React, { Component } from "react";
import { AlgolGameAPI, AlgolBattleUI } from "../../../types";

import { Board } from "../Board";
import { BattleUI } from "../BattleUI";

import dataURIs from "../../../graphics/dist/svgDataURIs";

type TesterProps = {
  api: AlgolGameAPI;
};

type TesterState = {
  ui: AlgolBattleUI;
};

const emptyBattleUI: AlgolBattleUI = {
  board: {
    units: {},
    marks: [],
    anim: { enterFrom: {}, exitTo: {}, ghosts: [] }
  },
  gameId: "anon",
  endTurn: false,
  undo: null,
  player: 0,
  commands: [],
  potentialMarks: [],
  instruction: { line: [] },
  turnNumber: 0
};

export class Tester extends Component<TesterProps, TesterState> {
  state = {
    ui: emptyBattleUI
  };
  act: (a: any) => AlgolBattleUI;
  componentDidMount() {
    const { initialUI, performAction } = this.props.api.newBattle();
    this.act = performAction;
    this.setState({ ui: initialUI });
  }
  handleAct = (action: string) => {
    this.setState({
      ui: this.act(action)
    });
  };
  render() {
    const { ui } = this.state;
    if (ui.gameId === "anon") return null;
    console.log(ui);
    return (
      <React.Fragment>
        <Board
          callback={this.handleAct}
          board={dataURIs[ui.gameId]}
          units={ui.board.units}
          marks={ui.board.marks}
          potentialMarks={ui.potentialMarks}
          anim={ui.board.anim}
        />
        <BattleUI callback={this.handleAct} ui={ui} />
      </React.Fragment>
    );
  }
}
