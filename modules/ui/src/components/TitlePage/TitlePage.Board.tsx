import classNames from "classnames";
import css from "./TitlePage.cssProxy";
import React, { Fragment, useCallback } from "react";
import { Button } from "../Button";
import { Board } from "../Board";
import { useTitleData } from "./TitlePage.useTitleData";
import { useDemo } from "../../helpers";
import { demo2ui, emptyBattleUI, gameCount } from "../../../../common";
import { AppActions } from "../../../../types";
import shellCss from "../Shell/Shell.cssProxy";

type TitleBoardProps = {
  actions: AppActions;
};

export const TitleBoard = (props: TitleBoardProps) => {
  const { actions } = props;
  const { titleData, actions: titleActions } = useTitleData();
  const { graphics, name, slug, demo, gameId, mainVariant } = titleData;
  const { frame, hydrDemo } = useDemo({
    demo,
    playing: true,
    restart: true,
    gameId,
  });
  const ui = hydrDemo ? demo2ui(hydrDemo, frame) : emptyBattleUI;
  const goToCurrentGame = useCallback(
    () => actions.navTo(`/games/${slug}/?sid=new_${mainVariant}&m=playing`),
    [slug, actions]
  );
  const seeAllGames = useCallback(() => actions.navTo("/games"), [actions]);
  return (
    <Fragment>
      <div
        className={classNames(
          css.titlePageBoardBoxContainer,
          shellCss.hideDuringFullNav
        )}
      >
        <div className={classNames(css.titlePageBoardBox)}>
          <div className={css.titlePageBoardGamesFlicker}>
            <Button onClick={titleActions.dec} text="←" />
          </div>
          <div className={css.titlePageBoardWelcome}>
            <span>welcome to</span>
            <h1>Chessicals!</h1>
            <div>
              Here you can{" "}
              <Button text={`play ${name}`} onClick={goToCurrentGame} />
            </div>
            <div>
              or{" "}
              <Button
                text={`browse all ${gameCount()} games`}
                onClick={seeAllGames}
              />
            </div>
          </div>
          <div className={css.titlePageBoardGamesFlicker}>
            <Button onClick={titleActions.inc} text="→" />
          </div>
        </div>
      </div>
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
