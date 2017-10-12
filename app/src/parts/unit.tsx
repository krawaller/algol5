import * as React from 'react';
import Piece from './piece';
import Square from './square';

import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

type UnitState = any;
type UnitProps = any

class Unit extends React.Component <UnitProps,UnitState> {
  constructor(p){
    super(p);
    this.state = {coords: this.props.unit.spawnCoords || this.props.unit.coords};
  }
  componentDidMount() {
    if (this.props.unit.spawnCoords){
      setTimeout(()=> this.setState({coords:this.props.unit.coords}),10)
    }
  }
  componentWillReceiveProps(nextProps) {
    let next = {coords:nextProps.unit.coords}
    /*if (false && (nextProps.unit.owner !== this.props.owner || nextProps.unit.group !== this.props.group)){
      next.old = this.props.unit
      setTimeout(()=>this.setState({old:undefined}),300)
    }*/
    this.setState(next)
  }
  render() {
    let {board,unit} = this.props
    let tileheightpc = 100/board.height
    let tilewidthpc = 100/board.width
    let coords = this.state.coords
    let cls = (unit.spawnCoords ? '' : 'fadein ') /* + (s.old ? 'hasold' : '') */
    return <Square also={cls} key={unit.id} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc}>
      <ReactCSSTransitionGroup transitionName="icon" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <Piece key={unit.id + '_' + unit.icon} owner={unit.owner} icon={unit.icon} />
      </ReactCSSTransitionGroup>
      { /* s.old && <Piece dir={s.old.dir} owner={s.old.owner} icon={s.old.group} /> */ }
    </Square>
  }
}

export default Unit