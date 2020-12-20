import React, { Fragment } from "react";
import { Board } from "../Board";
import { useDemo } from "../../helpers";
import { demo2ui, emptyBattleUI } from "../../../../common";
import { TitleData } from "../../../../payloads/dist/titleData";

type TitleBoardProps = {
  titleData: TitleData;
};

export const TitleBoard = (props: TitleBoardProps) => {
  const { titleData } = props;
  const { graphics, demo, gameId } = titleData;
  const { frame, hydrDemo } = useDemo({
    demo,
    playing: true,
    restart: true,
    gameId,
  });
  const ui = hydrDemo ? demo2ui(hydrDemo, frame) : emptyBattleUI;
  return (
    <Fragment>
      <Board
        graphics={graphics}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
      />
    </Fragment>
  );
};
