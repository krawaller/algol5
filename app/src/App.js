import React from 'react';

import games from '../../games/games'

import Battle from './components/battle'

let App = React.createClass({
  getInitialState() {
    return {}
  },
  chooseGame(gamename){
    this.setState({game:games[gamename]})
  },
  render() {
    if (!this.state.game){
      let choices = Object.keys(games).map((g,n)=> <button key={n} onClick={this.chooseGame.bind(this,g)}>{g}</button>)
      return <div>
        {choices}
      </div>;
    }
    return <div>
      <Battle game={this.state.game} />
    </div>;
  }
})

export default App;
