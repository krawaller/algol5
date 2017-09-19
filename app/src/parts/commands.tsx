import * as React from 'react'

type CommandProps = any;

// gameCommands, systemCommands, performCommand
let Commands = (props: CommandProps)=> {
    let gameCommands = Object.keys(props.gameCommands).map((name)=> (
        <button
            key={name}
            disabled={props.locked || !(props.gameCommands[name] || props.undo === name)}
            onClick={()=>props.performCommand(props.undo === name ? "undo" : name)}
            className="commandbtn"
        >{props.undo === name ? "undo " + name : name}</button>
    ))
    let submitButton = (
        <button className="submitbtn commandbtn" key={"submit"} disabled={props.locked || !props["submit"]} onClick={()=>props.performCommand(props["submit"])}>submit</button>
    );
    /*let brainCommands = props.brains.map(name => (
        <button key={name} onClick={()=>props.askBrain(name)}>Ask {name}</button>
    ))*/
    return <div>{gameCommands}{submitButton}</div>
};

export default Commands