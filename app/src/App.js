import React from 'react';

import krieg from '../../games/built/krieg'
import play from '../../src/play'

import Units from './components/units'
import Marks from './components/marks'
import Commands from './components/commands'

let App = React.createClass({
  getInitialState() {
    return {
      session: play.startGameSession(krieg)
    }
  },
  doAction(action) {
    this.setState({
      session: play.makeSessionAction(this.state.session,action)
    })
  },
  removeMark(pos) {
    let s = this.state.session
    s.step = s.turn.steps[ s.marks[pos] ]
    this.setState({
      session: s
    })
  },
  render() {
    let s = this.state.session
    return (
      <div>
        <h4>Playing Krieg!</h4>
        <div className="board">
          <Units icons={krieg.graphics.icons} unitdata={s.step.UNITDATA} board={krieg.board} />
          <Marks board={krieg.board} activeMarks={s.step.MARKS} potentialMarks={s.UI.marks} selectMark={this.doAction}/>
        </div>
        <Commands gameCommands={s.UI.commands} systemCommands={s.UI.system} performCommand={this.doAction}/>
      </div>
    );
  }
})

export default App;
