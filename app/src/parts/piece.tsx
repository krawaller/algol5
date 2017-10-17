import * as React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const fullicons = {
    pawn: "♟",
    knight: "♞",
    bishop: "♝",
    rook: "♜",
    queen: "♛",
    king: "♚"
};

const lineicons = {
    pawn: "♙",
    knight: "♘",
    bishop: "♗",
    rook: "♖",
    queen: "♕",
    king: "♔"
};

type PieceProps = any;

let Piece = (props: PieceProps)=> {
    let cls = "piece owner"+(props.owner||0)
    return (
        <div className={cls}>
            {fullicons[props.icon]||''}
        </div>
    );
};

export default Piece