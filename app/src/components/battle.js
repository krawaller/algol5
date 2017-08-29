import React from 'react';

import makeAlgol from '../../../logic/dist/algol_async';

// Path here will be relative to 'index.html'
let algol = makeAlgol('../logic/dist/algol_worker.js', 1);

import Units from '../parts/units'
import Marks from '../parts/marks'
import Commands from '../parts/commands'

import random from 'lodash/random'

let Battle = React.createClass({
  getInitialState() {
    return {
      UI: { waiting: 'loading', players: [], board: {} }
      //UI: algol.startGameSession(this.props.gameId,this.props.participants[0],this.props.participants[1])
    }
  },
  doAction(action) {
    this.setState({UI: {...this.state.UI, waiting: action}}, ()=>{
      algol.performAction(this.state.UI.sessionId,action).then(UI=>{
        this.setState({UI:UI}, this.maybeAI);
        /*algol.debug(UI.sessionId).then(res => {
          this.setState({UI:UI}, this.maybeAI);
          console.log("Performed",action," => ",{UI,debug:res});
        });*/
      });
    });
  },
  componentDidMount(){
    console.log("So, initiating algol async call...");
    algol.startGame(this.props.gameId,this.props.participants[0],this.props.participants[1]).then(UI =>{
      this.setState({UI:UI}, this.maybeAI)
    });
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
    this.setState({UI: {...this.state.UI, waiting: 'AI thinking'}}, ()=>{
      algol.findBestOption(UI.sessionId, plr.name).then(options => {
        let moves = options[ random(0,options.length-1) ].concat('endturn') // TODO - win here?
        for(let i=0; i<moves.length; i++){
          setTimeout( this.doAction.bind(this,moves[i]), i*800 ) // TODO - make less naïve code here
        }
        console.log("AI moves",moves)
      });
    });
  },
  render() {
    let UI = this.state.UI,
        p = UI.players[UI.playing-1];
    let cmnd = (p && p.type === "ai")
      ? <div>Awaiting {p.name}</div>
      : UI.waiting ? <div>...calculating...</div>
      : (<div>
        <div>{UI.instruction}</div>
        <Commands gameCommands={UI.commands} systemCommands={UI.system} performCommand={this.doAction} brains={this.props.game.AI} askBrain={this.askBrain}/>
      </div>)
    if (!UI.waiting){
      let available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo'));
      //console.log("Available now", available.sort());
    }
    let style = {
      height:UI.board.height*50,
      width:UI.board.width*50,
      backgroundImage: 'url(../logic/dist/boards/'+UI.gameId+'.png)'
    }
    return (
      <div>
        <h4>Playing!</h4>
        <div className="board" style={style}>
          {UI.units && <Units unitdata={UI.units} board={UI.board} />}
          {p && p.type !== "ai" && !UI.waiting && <Marks board={UI.board} activeMarks={UI.activeMarks} potentialMarks={UI.potentialMarks} selectMark={this.doAction}/>}
        </div>
        {cmnd}
      </div>
    );
  }
})

export default Battle;
