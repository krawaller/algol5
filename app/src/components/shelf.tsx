import * as React from 'react';
import * as moment from 'moment';

type PropType = {
  algol: any;
  chooseGame: (any) => any
};
type StateType = {
  lib: any;
};

class Shelf extends React.Component <PropType,StateType> {
  constructor(props){
    super(props);
    this.state = {lib: {}};
  }
  componentDidMount(){
    this.props.algol.gameLibrary().then(lib => this.setState({lib}));
  }
  chooseGame(gamename){
    this.props.chooseGame(this.state.lib[gamename]);
  }
  render() {
    let choices = Object.keys(this.state.lib).map((g,n)=> <button key={n} onClick={this.chooseGame.bind(this,g)}>{g}</button>)
    const dateStr = moment(BUILT_AT).format('YYYY-MM-DD HH:mm');
    return (
      <div>
        <h2>Welcome to Algol!</h2>
        <p>Built at {dateStr}</p>
        <div>{choices}</div>
      </div>
    );
  }
}

export default Shelf;
