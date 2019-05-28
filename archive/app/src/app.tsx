import * as React from 'react';

import Shelf from './components/shelf'
import Vestibule from './components/vestibule'
import Battle from './components/battle'

import * as makeAlgol from '../../session/dist/algol_async';
let algol = makeAlgol('algol_worker.js', 1); // Path here will be relative to 'index.html'

type Props = {};

type State = {
  game: any,
  participants: [string,string]
};

export default class App extends React.Component <Props,State>{
  constructor(p){
    super(p);
    this.state = {game: null, participants: null};
    this.chooseGame = this.chooseGame.bind(this);
    this.selectParticipants = this.selectParticipants.bind(this);
  }
  chooseGame(game){
    this.setState({game:game})
  }
  selectParticipants(plr1,plr2){
    this.setState({participants:[plr1,plr2]})
  }
  render() {
    if (!this.state.game){
      return <Shelf chooseGame={this.chooseGame} algol={algol} />;
    } else if (!this.state.participants) {
      return <Vestibule game={this.state.game} selectParticipants={this.selectParticipants}/>;
    } else {
      return <Battle game={this.state.game} algol={algol} participants={this.state.participants} />;
    }
  }
}
