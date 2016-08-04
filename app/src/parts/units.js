import React from 'react'
import Square from './square'
import Piece from './piece'

import lib from '../../../src/codegen'
import map from 'lodash/collection/map'

// icons, board, unitdata
let Units = (props)=> {
    let tileheightpc = 100/props.board.height
    let tilewidthpc = 100/props.board.width
    let units = map(props.unitdata,(unit)=> {
        let coords = lib.pos2coords(unit.pos)
        return <Square key={unit.id} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc}>
            <Piece dir={unit.dir} owner={unit.owner} icon={props.icons[unit.group]} />
        </Square>
    })
    return <div>{units}</div>
};

export default Units