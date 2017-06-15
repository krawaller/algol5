import React from 'react';

import Shelf from './components/shelf'
import Vestibule from './components/vestibule'
import Battle from './components/battle'

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
      return <Shelf chooseGame={this.chooseGame} />;
    } else if (!this.state.participants) {
      return <Vestibule game={this.state.game} selectParticipants={this.selectParticipants}/>;
    } else {
      return <Battle game={this.state.game} gameId={this.state.game.id} participants={this.state.participants} />;
    }
  }
})

export default App;
