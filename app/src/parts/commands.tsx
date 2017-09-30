import * as React from 'react'

type CommandProps = {
    locked: boolean
    performCommand: (cmnd: string) => void
    undo?: string
    submit?: string
    gameCommands: { [cmndname: string]: string; }
    firstTurn: boolean
    openHistory: () => void
};

// gameCommands, systemCommands, performCommand
let Commands = (props: CommandProps)=> {
    let gameCommands = Object.keys(props.gameCommands).map((name)=> (
        <button
            key={name}
            disabled={props.locked || !props.gameCommands[name]}
            onClick={()=>props.performCommand(name)} //props.undo === name ? "undo" : name)}
            className="commandbtn"
        >{name}</button>
    ))
    let submitButton = (
        <button className="submitbtn commandbtn" key={"submit"} disabled={props.locked || !props.submit} onClick={()=>props.performCommand(props.submit)}>submit</button>
    );
    let undoButton = (
        <button className="submitbtn commandbtn" key={"undo"} disabled={props.locked || !props.undo} onClick={()=>props.performCommand("undo")}>undo</button>
    )
    let historyButton = (
        <button className="commandbtn" disabled={!props.firstTurn} onClick={()=>props.openHistory()}>history</button>
    )
    /*let brainCommands = props.brains.map(name => (
        <button key={name} onClick={()=>props.askBrain(name)}>Ask {name}</button>
    ))*/
    return (
        <div className="commands">
            <div>{gameCommands}</div>
            <div>{submitButton}{undoButton}{historyButton}</div>
        </div>
    );
};

export default Commands