import * as React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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