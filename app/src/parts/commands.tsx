import * as React from 'react'

type CommandProps = any;

// gameCommands, systemCommands, performCommand
let Commands = (props: CommandProps)=> {
    let gameCommands = Object.keys(props.gameCommands).map((name)=> (
        <button key={name} disabled={props.locked || !props.gameCommands[name]} onClick={()=>props.performCommand(name)}>{name}</button>
    ))
    let systemCommands = ["undo","submit"].map((name)=> (
        <button className={"syscommands " + name} key={name} disabled={props.locked || !props[name]} onClick={()=>props.performCommand(props[name])}>{name}</button>
    ))
    /*let brainCommands = props.brains.map(name => (
        <button key={name} onClick={()=>props.askBrain(name)}>Ask {name}</button>
    ))*/
    return <div>{gameCommands}{systemCommands}</div>
};

export default Commands