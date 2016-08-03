import React from 'react'

import map from 'lodash/collection/map'

// gameCommands, systemCommands, performCommand
let Commands = (props)=> {
    let gameCommands = map(props.gameCommands,(func,name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    let systemCommands = map(props.systemCommands,(func,name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    return <div>{gameCommands}{systemCommands}</div>
};

export default Commands