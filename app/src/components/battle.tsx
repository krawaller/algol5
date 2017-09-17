import * as React from 'react';

import Units from '../parts/units';
import Marks from '../parts/marks';
import Commands from '../parts/commands';

import random from 'lodash/random';

type BattleState = any;
type BattleProps = any;

class Battle extends React.Component <BattleProps,BattleState> {
  constructor(p){
    super(p);
    this.state = {
      UI: { waiting: 'loading', players: [], board: {} }
      //UI: algol.startGameSession(this.props.game.id,this.props.participants[0],this.props.participants[1])
    };
    this.doAction = this.doAction.bind(this);
    this.maybeAI = this.maybeAI.bind(this);
    this.askBrain = this.askBrain.bind(this);
    this.makeAImoves = this.makeAImoves.bind(this);
  }
  doAction(action) {
    this.setState({UI: {...this.state.UI, waiting: action}}, ()=>{
      this.props.algol.performAction(this.state.UI.sessionId,action).then(UI=>{
        this.setState({UI:UI}, this.maybeAI);
        /*this.props.algol.debug(UI.sessionId).then(res => {
          this.setState({UI:UI}, this.maybeAI);
          console.log("Executed",action," => ",{UI,debug:res});
        });*/
      });
    });
  }
  componentDidMount(){
    console.log("So, initiating algol async call...");
    this.props.algol.startGame(this.props.game.id,this.props.participants[0],this.props.participants[1]).then(UI =>{
      this.setState({UI:UI}, this.maybeAI)
    });
  }
  askBrain(name) { // TODO - broken now
    let s = this.state.session
    let p = this.props
    let func = 'brain_'+name+'_'+s.turn.player
    let score = s.game[func](s.step)
    let details = s.game[func+'_detailed'](s.step)
    console.log("WHAT DOES",name,"SAY?",score,details,this.findBest(name))
  }
  findBest(brain) {
    let s = this.state.session
    let best = this.props.algol.findBestOption(s.UI.sessionId,brain)
    console.log("BEST OPTIONS",best)
  }
  maybeAI() {
    let UI = this.state.UI,
        plr = UI.players[UI.playing-1]
    if (UI.turnStart && plr.type === 'ai'){
      setTimeout(this.makeAImoves,100);
    }
  }
  makeAImoves() {
    let UI = this.state.UI
    let plr = UI.players[UI.playing-1]
    this.setState({UI: {...this.state.UI, waiting: 'AI thinking'}}, ()=>{
      this.props.algol.findBestOption(UI.sessionId, plr.name).then(moves => {
        for(let i=0; i<moves.length; i++){
          setTimeout( this.doAction.bind(this,moves[i]), i*800 ) // TODO - make less naïve code here
        }
      });
    });
  }
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
    /*if (!UI.waiting){
      let available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo'));
      console.log("Available now", available.sort());
    }*/
    let style = {
      height:this.props.game.board.height*50,
      width:this.props.game.board.width*50,
      backgroundImage: 'url(images/'+this.props.game.id+'.png)' // Relative to index file
    }
    return (
      <div>
        <h4>Playing!</h4>
        <div className="board" style={style}>
          {UI.units && <Units unitdata={UI.units} board={UI.board} />}
          {p && <Marks board={UI.board} ai={p.type === "ai"} activeMarks={UI.activeMarks} potentialMarks={UI.potentialMarks} selectMark={this.doAction}/>}
        </div>
        {cmnd}
      </div>
    );
  }
}

export default Battle;
