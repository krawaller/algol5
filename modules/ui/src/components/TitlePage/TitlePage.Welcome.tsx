import classNames from "classnames";
import css from "./TitlePage.cssProxy";
import React, { Fragment, useCallback } from "react";
import { Button } from "../Button";
import { useTitleData } from "./TitlePage.useTitleData";
import { gameCount } from "../../../../common";
import { AppActions } from "../../../../types";
import shellCss from "../Shell/Shell.cssProxy";

type TitleWelcomeProps = {
  actions: AppActions;
};

export const TitleWelcome = (props: TitleWelcomeProps) => {
  const { actions } = props;
  const { titleData, actions: titleActions } = useTitleData();
  const { name, slug, mainVariant } = titleData;
  const goToCurrentGame = useCallback(
    () => actions.navTo(`/games/${slug}/?sid=new_${mainVariant}&m=playing`),
    [slug, actions]
  );
  const seeAllGames = useCallback(() => actions.navTo("/games"), [actions]);
  return (
    <Fragment>
      <div
        className={classNames(
          css.titlePageWelcomeContainer,
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
    </Fragment>
  );
};
