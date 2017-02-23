import React from 'react'

import Square from './square'

import map from 'lodash/collection/map'

// activeMarks, potentialMarks, board, selectMark
let Marks = (props)=> {
    let tileheightpc = 100/props.board.height
    let tilewidthpc = 100/props.board.width
    let activeMarks = map(props.activeMarks, ({pos,coords}) => {
        let callback = ()=> props.selectMark(pos)
        return <Square onClick={callback} key={pos} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc} also="mark activemark"/>
    })
    let potentialMarks = map(props.potentialMarks,({pos,coords})=> {
        let callback = ()=> props.selectMark(pos)
        return <Square onClick={callback} key={pos} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc} also="mark potentialmark"/>
    })
    return <div>{activeMarks}{potentialMarks}</div>
};

export default Marks