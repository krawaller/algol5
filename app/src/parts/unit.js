import React from 'react'
import Piece from './piece'
import Square from './square'

import lib from '../../../src/codegen'

let Unit = React.createClass({
  getInitialState(){ return {pos: this.props.unit.from || this.props.unit.pos}},
  componentDidMount() {
    if (this.props.unit.from){
      setTimeout(()=> this.setState({pos:this.props.unit.pos}),10)
    }
  },
  componentWillReceiveProps(nextProps) {
    let next = {pos:nextProps.unit.pos}
    if (false && (nextProps.unit.owner !== this.props.owner || nextProps.unit.group !== this.props.group)){
      next.old = this.props.unit
      setTimeout(()=>this.setState({old:undefined}),300)
    }
    this.setState(next)
  },
  render() {
    let p = this.props
    let s = this.state
    let tileheightpc = 100/p.board.height
    let tilewidthpc = 100/p.board.width
    let unit = p.unit
    let coords = lib.pos2coords(s.pos)
    let cls = (unit.from?'':'fadein ') + (s.old ? 'hasold' : '')
    return <Square also={cls} key={unit.id} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc}>
      <Piece dir={unit.dir} owner={unit.owner} icon={p.icons[unit.group]} />
      {s.old && <Piece dir={s.old.dir} owner={s.old.owner} icon={p.icons[s.old.group]} />}
    </Square>
  }
})

export default Unit