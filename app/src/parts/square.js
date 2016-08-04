import React from 'react'

let Square = (props)=> {
    let css = {
        height: props.height+"%",
        width: props.width+"%",
        bottom: (props.y-1)*props.height+"%",
        left: (props.x-1)*props.width+"%"
    }
    return ( <div onClick={props.onClick} style={css} className={"square"+(props.also ? ' '+props.also : '')}>
      {props.children}
    </div>);
}

export default Square