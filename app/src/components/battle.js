import React from 'react';

import play from '../../../src/play'

import Units from '../parts/units'
import Marks from '../parts/marks'
import Commands from '../parts/commands'

import random from 'lodash/number/random'

let Battle = React.createClass({
  getInitialState() {
    return {
      session: play.startGameSession(this.props.game,this.props.participants[0],this.props.participants[1])
    }
  },
  doAction(action) {
    this.setState({
      session: play.makeSessionAction(this.state.session,action)
    },this.maybeAI)
  },
  componentDidMount(){
    this.maybeAI()
  },
  removeMark(pos) {
    let s = this.state.session
    s.step = s.turn.steps[ s.marks[pos] ]
    this.setState({
      session: s
    })
  },
  askBrain(name) {
    let s = this.state.session
    let p = this.props
    let func = 'brain_'+name+'_'+s.turn.player
    let score = s.game[func](s.step)
    let details = s.game[func+'_detailed'](s.step)
    console.log("WHAT DOES",name,"SAY?",score,details,this.findBest(name))
  },
  findBest(brain) {
    let s = this.state.session
    let best = play.findBestOption(s.game,s.turn,brain)
    console.log("BEST OPTIONS",best)
  },
  maybeAI() {
    let s = this.state.session,
        p = s.players[s.turn.player-1]
    if (s.step.stepid === 'root' && p.type === 'ai' && !this.aiThinking){
      setTimeout(this.makeAImoves,100);
    }
  },
  makeAImoves() {
    console.log("Gonna make AI moves")
    let s = this.state.session
    let options = play.findBestOption(s.game,s.turn,s.players[s.turn.player-1].name)
    let targetStepId = options[ random(0,options.length-1) ]
    let targetStep = s.turn.steps[targetStepId]
    let moves = targetStep.path.concat('endturn') // TODO - win here?
    for(let i=0; i<moves.length; i++){
      setTimeout( this.doAction.bind(this,moves[i]), i*800 )
    }
    console.log("AI moves",moves)
  },
  render() {
    let s = this.state.session,
        p = s.players[s.turn.player-1]
    let cmnd = p.type === "ai"
      ? <div>Awaiting {p.name}</div>
      : (<div>
        <div>{s.UI.instruction}</div>
        <Commands gameCommands={s.UI.commands} systemCommands={s.UI.system} performCommand={this.doAction} brains={this.props.game.AI} askBrain={this.askBrain}/>
      </div>)
    console.log("GONNA RENDER",s)
    let style = {
      height:s.game.board.height*50,
      width:s.game.board.width*50,
      backgroundImage: 'url(../games/boards/'+s.game.id+'.png)'
    }
    return (
      <div>
        <h4>Playing!</h4>
        <div className="board" style={style}>
          <Units icons={this.props.game.graphics.icons} unitdata={s.step.UNITDATA} board={this.props.game.board} />
          {p.type !== "ai" && <Marks board={this.props.game.board} activeMarks={s.step.MARKS} potentialMarks={s.UI.marks} selectMark={this.doAction}/>}
        </div>
        {cmnd}
      </div>
    );
  }
})

export default Battle;
