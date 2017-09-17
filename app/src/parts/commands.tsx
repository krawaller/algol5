import * as React from 'react'

type CommandProps = any;

// gameCommands, systemCommands, performCommand
let Commands = (props: CommandProps)=> {
    let gameCommands = props.gameCommands.map((name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    let systemCommands = props.systemCommands.map((name)=> (
        <button key={name} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    let brainCommands = props.brains.map(name => (
        <button key={name} onClick={()=>props.askBrain(name)}>Ask {name}</button>
    ))
    return <div>{gameCommands}{systemCommands}{brainCommands}</div>
};

export default Commands