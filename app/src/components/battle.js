import React from 'react';

import algol from '../../../dist/algol'

import Units from '../parts/units'
import Marks from '../parts/marks'
import Commands from '../parts/commands'

import random from 'lodash/random'

let Battle = React.createClass({
  getInitialState() {
    return {
      UI: algol.startGameSession(this.props.game.id,this.props.participants[0],this.props.participants[1])
    }
  },
  doAction(action) {
    this.setState({
      UI: algol.makeSessionAction(this.state.UI.sessionId,action)
    },this.maybeAI)
  },
  componentDidMount(){
    this.maybeAI()
  },
  askBrain(name) { // TODO - broken now
    let s = this.state.session
    let p = this.props
    let func = 'brain_'+name+'_'+s.turn.player
    let score = s.game[func](s.step)
    let details = s.game[func+'_detailed'](s.step)
    console.log("WHAT DOES",name,"SAY?",score,details,this.findBest(name))
  },
  findBest(brain) {
    let s = this.state.session
    let best = algol.findBestOption(s.UI.sessionId,brain)
    console.log("BEST OPTIONS",best)
  },
  maybeAI() {
    let UI = this.state.UI,
        plr = UI.players[UI.playing-1]
    if (UI.turnStart && plr.type === 'ai' && !this.aiThinking){
      setTimeout(this.makeAImoves,100);
    }
  },
  makeAImoves() {
    console.log("Gonna make AI moves")
    let UI = this.state.UI
    let plr = UI.players[UI.playing-1]
    let options = algol.findBestOption(UI.sessionId, plr.name)
    let moves = options[ random(0,options.length-1) ].concat('endturn') // TODO - win here?
    for(let i=0; i<moves.length; i++){
      setTimeout( this.doAction.bind(this,moves[i]), i*800 )
    }
    console.log("AI moves",moves)
  },
  render() {
    let UI = this.state.UI,
        p = UI.players[UI.playing-1];
    let cmnd = p.type === "ai"
      ? <div>Awaiting {p.name}</div>
      : (<div>
        <div>{UI.instruction}</div>
        <Commands gameCommands={UI.commands} systemCommands={UI.system} performCommand={this.doAction} brains={this.props.game.AI} askBrain={this.askBrain}/>
      </div>)
    console.log("GONNA RENDER",UI)
    let style = {
      height:UI.board.height*50,
      width:UI.board.width*50,
      backgroundImage: 'url(../dist/boards/'+UI.gameId+'.png)'
    }
    return (
      <div>
        <h4>Playing!</h4>
        <div className="board" style={style}>
          <Units unitdata={UI.units} board={UI.board} />
          {p.type !== "ai" && <Marks board={UI.board} activeMarks={UI.activeMarks} potentialMarks={UI.potentialMarks} selectMark={this.doAction}/>}
        </div>
        {cmnd}
      </div>
    );
  }
})

export default Battle;
