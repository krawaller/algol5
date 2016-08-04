import React from 'react'

// gameCommands, systemCommands, performCommand
let Commands = (props)=> {
    let gameCommands = props.gameCommands.map((name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    let systemCommands = props.systemCommands.map((name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    return <div>{gameCommands}{systemCommands}</div>
};

export default Commands