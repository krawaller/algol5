import * as React from 'react';

type SquareProps = any;

let Square = (props: SquareProps)=> {
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