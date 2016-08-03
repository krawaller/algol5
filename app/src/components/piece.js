import React from 'react'

const fullicons = {
    pawns: "♟",
    knights: "♞",
    bishops: "♝",
    rooks: "♜",
    queens: "♛",
    kings: "♚"
};

const lineicons = {
    pawns: "♙",
    knights: "♘",
    bishops: "♗",
    rooks: "♖",
    queens: "♕",
    kings: "♔"
};

let Piece = (props)=> {
    let cls = "piece dir"+(props.dir||1)+" owner"+(props.owner||0)
    return (
        <div className={cls}>
            <span>{fullicons[props.icon]||''}</span>
        </div>
    );
};

export default Piece