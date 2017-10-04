import * as React from 'react';

import Units from '../parts/units';
import Marks from '../parts/marks';
import Commands from '../parts/commands';
import History from '../parts/history';
import Playback from '../parts/playback';

import random from 'lodash/random';

import { BattleUI } from '../../../engine/src/types';

import optionsInUI from '../../../engine/src/various/optionsinui.ts';

type BattleState = {
  waiting: string | undefined,
  players: string[],
  UI?: BattleUI,
  step: number
};
type BattleProps = {
  game: any,
  algol: any,
  participants: [string,string]
};

class Battle extends React.Component <BattleProps,BattleState> {
  constructor(p){
    super(p);
    this.state = {
      waiting: 'loading',
      players: [],
      UI: null,
      step: -1,
    };
    this.doAction = this.doAction.bind(this);
    this.maybeAI = this.maybeAI.bind(this);
    this.askBrain = this.askBrain.bind(this);
    this.makeAImoves = this.makeAImoves.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }
  selectStep(idx: number) {
    this.setState({step: idx});
  }
  doAction(action) {
    this.setState({waiting: action}, ()=>{
      this.props.algol.performAction(this.state.UI.sessionId,action).then(UI=>{
        this.setState({UI:UI,waiting:undefined}, this.maybeAI);
        console.log("Action",action,"Options",optionsInUI(UI),"UI",UI);
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
    /*let s = this.state.session
    let p = this.props
    let func = 'brain_'+name+'_'+s.turn.player
    let score = s.game[func](s.step)
    let details = s.game[func+'_detailed'](s.step)
    console.log("WHAT DOES",name,"SAY?",score,details,this.findBest(name))*/
  }
  findBest(brain) {
    let best = this.props.algol.findBestOption(this.state.UI.sessionId,brain)
    console.log("BEST OPTIONS",best)
  }
  maybeAI() {
    let UI = this.state.UI,
        plr = UI.players[UI.current.UI.playing-1]
    if (UI.current.controls.turnStart && plr.type === 'ai'){
      setTimeout(this.makeAImoves,100);
    }
  }
  makeAImoves() {
    let UI = this.state.UI
    let plr = UI.players[UI.current.UI.playing-1]
    this.setState({waiting: 'AI thinking'}, ()=>{
      this.props.algol.findBestOption(UI.sessionId, plr.name).then(moves => {
        for(let i=0; i<moves.length; i++){
          setTimeout( this.doAction.bind(this,moves[i]), i*800 ) // TODO - make less naïve code here
        }
      });
    });
  }
  render() {
    const UI = this.state.UI;
    if (!UI){
      return <div>...loading...</div>;
    }
    let totalHistory = UI.history.concat(UI.current.history)
    if (!UI.endedBy){
      totalHistory.push({
        ...UI.current.UI,
        idx: -1,
        description: '...playing...'
      });
    }
    const maxStep = UI.endedBy ? totalHistory.length - 1 : totalHistory.length - 2;
    const inHistory = this.state.step !== -1;
    let ctrls = UI.current.controls,
        step = (!inHistory ? UI.current.UI : totalHistory[this.state.step]),
        p = UI.players[UI.current.UI.playing-1];
    let info = inHistory
      ? 'showing history'
      : UI.endedBy
      ? ctrls.instruction 
      : (p && p.type === "ai")
      ? <div>Awaiting {p.name}</div>
      :  this.state.waiting ? <div>...calculating...</div>
      : ctrls.instruction;
    let plrCanAct = !(p && p.type === "ai") && !this.state.waiting;
    /*if (!UI.waiting){
      let available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo'));
      console.log("Available now", available.sort());
    }*/
    const tileSize = 50;
    const borderSize = tileSize * (75/200); // TODO - fetch?
    const style = {
      height:this.props.game.board.height*tileSize + borderSize * 2,
      width:this.props.game.board.width*tileSize + borderSize * 2,
      position: 'relative' as "relative",
      //backgroundImage: 'url(images/'+this.props.game.id+'.png)' // Relative to index file
    }
    const offset = {
      top: borderSize,
      left: borderSize,
      height: style.height - 2*borderSize,
      width: style.width - 2*borderSize,
      position: "relative" as "relative"
    }
    return (
      <div>
        <h4>Playing!</h4>
        <div className={"board " + this.props.game.id} style={style}>
          <History history={totalHistory} offset={style.width} selectStep={this.selectStep} currentStep={this.state.step}/>
          <div style={offset}>
            {step.units && <Units unitdata={step.units} board={this.props.game.board} />}
            {p && <Marks board={this.props.game.board} disabled={p.type === "ai" || inHistory} activeMarks={step.marks} potentialMarks={inHistory ? [] : ctrls.potentialMarks} selectMark={this.doAction}/>}
          </div>
        </div>
        <div>
          {UI && !inHistory && ctrls.commands && <Commands openHistory={()=>this.selectStep(0)} hasHistory={maxStep > 0} locked={!plrCanAct} gameCommands={ctrls.commands} undo={ctrls.undo} submit={ctrls.submit} performCommand={this.doAction}/>}
          {UI && inHistory && <Playback stepIndex={this.state.step} maxStep={maxStep} selectStep={this.selectStep} onGoing={!UI.endedBy} />}
          <div>{info}</div>
      </div>
      </div>
    );
  }
}

export default Battle;
