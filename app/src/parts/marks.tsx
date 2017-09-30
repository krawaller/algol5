import * as React from 'react';

import Square from './square'

import { PositionList } from '../../../engine/src/types';

type MarkProps = {
    board: {height: number, width: number},
    activeMarks: PositionList
    potentialMarks: PositionList
    selectMark: (pos: string) => void,
    disabled: boolean
};

// activeMarks, potentialMarks, board, selectMark
let Marks = (props: MarkProps)=> {
    let tileheightpc = 100/props.board.height
    let tilewidthpc = 100/props.board.width
    let activeMarks = props.activeMarks.map(({pos,coords}) => {
        let callback = ()=> props.selectMark(pos)
        return <Square onClick={props.disabled ? ()=>{} : callback } key={pos} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc} also="mark activemark"/>
    })
    let potentialMarks = props.potentialMarks.map(({pos,coords})=> {
        let callback = ()=> props.selectMark(pos)
        return <Square onClick={props.disabled ? ()=>{} : callback } key={pos} x={coords.x} y={coords.y} height={tileheightpc} width={tilewidthpc} also="mark potentialmark"/>
    })
    return <div>{activeMarks}{potentialMarks}</div>
};

export default Marks