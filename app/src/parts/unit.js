import React from 'react'
import Piece from './piece'
import Square from './square'

import lib from '../../../src/codegen'

let Unit = React.createClass({
  getInitialState(){ return {pos: this.props.unit.from || this.props.unit.pos}},
  componentDidMount() {
    if (this.props.unit.from){
      setTimeout(()=>{
        this.setState({pos:this.props.unit.pos})
      },10)
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({pos:nextProps.unit.pos})
  },
  render() {
    let tileheightpc = 100/this.props.board.height
    let tilewidthpc = 100/this.props.board.width
    let unit = this.props.unit
    let coords = lib.pos2coords(this.state.pos)
    return <Square also={unit.from?'':'fadein'} key={unit.id} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc}>
      <Piece dir={unit.dir} owner={unit.owner} icon={this.props.icons[unit.group]} />
    </Square>
  }
})

export default Unit