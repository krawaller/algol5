import React from 'react'

import Square from './square'

import lib from '../../../src/codegen'
import map from 'lodash/collection/map'

// terrain, graphics
let Terrain = (props)=> {
    let tileheightpc = 100/props.board.height
    let tilewidthpc = 100/props.board.width
    let tiles = map(props.terrain,(pos,what)=> {
        let coords = lib.pos2coords(pos)
        let cls = props.graphics.tiles
        return <Square key={pos} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc} also="mark activemark"/>
    })
    return <div>{tiles}</div>
};

export default Terrain