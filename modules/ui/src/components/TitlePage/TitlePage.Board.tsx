import React, { Fragment } from "react";
import { Board } from "../Board";
import { useTitleData } from "./TitlePage.useTitleData";
import { useDemo } from "../../helpers";
import { demo2ui, emptyBattleUI } from "../../../../common";
import { AppActions } from "../../../../types";
import { TitleWelcome } from "./TitlePage.Welcome";

type TitleBoardProps = {
  actions: AppActions;
};

export const TitleBoard = (props: TitleBoardProps) => {
  const { actions } = props;
  const { titleData } = useTitleData();
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
      <TitleWelcome actions={actions} />
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
