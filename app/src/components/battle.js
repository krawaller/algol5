import React from 'react';

import play from '../../../src/play'

import Units from '../parts/units'
import Marks from '../parts/marks'
import Commands from '../parts/commands'

let Battle = React.createClass({
  getInitialState() {
    return {
      session: play.startGameSession(this.props.game)
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
    console.log("GONNA RENDER",s)
    return (
      <div>
        <h4>Playing!</h4>
        <div className="board" style={{height:s.game.board.height*50,width:s.game.board.width*50}}>
          <Units icons={this.props.game.graphics.icons} unitdata={s.step.UNITDATA} board={this.props.game.board} />
          <Marks board={this.props.game.board} activeMarks={s.step.MARKS} potentialMarks={s.UI.marks} selectMark={this.doAction}/>
        </div>
        <div>{s.UI.instruction}</div>
        <Commands gameCommands={s.UI.commands} systemCommands={s.UI.system} performCommand={this.doAction}/>
      </div>
    );
  }
})

export default Battle;
