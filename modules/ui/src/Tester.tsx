import React, { useLayoutEffect, useState, Component } from "react";
import { AlgolGameAPI, AlgolBattleUI } from "../../types";
import { GameId } from "../../games/dist/list";

import { Content } from "./Content";
import { Board } from "./Board";

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
          gameId={ui.gameId as GameId}
          units={ui.board.units}
          marks={ui.board.marks}
          potentialMarks={ui.potentialMarks}
          anim={ui.board.anim}
        />
        <Content content={ui.instruction} callback={this.handleAct} />
        {ui.undo && (
          <div>
            <button onClick={() => this.handleAct("undo")}>
              Undo {ui.undo}
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
/*
export const Tester: React.FunctionComponent<TesterProps> = ({ api }) => {
  const [UI, setUI] = useState(emptyBattleUI);
  let act: (str: string) => void = () => {
    console.log("initial act :/");
  };
  useLayoutEffect(() => {
    const { initialUI, performAction } = api.newBattle();
    act = cmnd => {
      console.log("CMND", cmnd);
      const newUI = performAction(cmnd);
      setUI(newUI);
    };
    setUI(initialUI);
    console.log("LAYOUTEFFECT DONE");
  }, [api]);
  if (UI.gameId === "anon") return null;
  console.log("OMG", UI);
  return (
    <React.Fragment>
      <Board
        callback={act}
        gameId={UI.gameId as GameId}
        units={UI.board.units}
        marks={UI.board.marks}
        potentialMarks={UI.potentialMarks}
      />
      <Content content={UI.instruction} callback={act} />
    </React.Fragment>
  );
};
*/
