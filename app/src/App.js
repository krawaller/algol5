import React from 'react';

import Shelf from './components/shelf'
import Vestibule from './components/vestibule'
import Battle from './components/battle'

import makeAlgol from '../../engine/dist/algol_async';
let algol = makeAlgol('../engine/dist/algol_worker.js', 1); // Path here will be relative to 'index.html'

let App = React.createClass({
  getInitialState() {
    return {}
  },
  chooseGame(game){
    this.setState({game:game})
  },
  selectParticipants(plr1,plr2){
    this.setState({participants:[plr1,plr2]})
  },
  render() {
    if (!this.state.game){
      return <Shelf chooseGame={this.chooseGame} algol={algol} />;
    } else if (!this.state.participants) {
      return <Vestibule game={this.state.game} selectParticipants={this.selectParticipants}/>;
    } else {
      return <Battle game={this.state.game} algol={algol} participants={this.state.participants} />;
    }
  }
})

export default App;
