import classNames from "classnames";
import css from "./TitlePage.cssProxy";
import React, { Fragment, useCallback } from "react";
import { Button } from "../Button";
import { TitleDemo } from "./TitlePage.useTitleData";
import { gameCount } from "../../../../common";
import { AppActions } from "../../../../types";
import shellCss from "../Shell/Shell.cssProxy";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { TitleMoreInfo } from "./TitlePage.MoreInfo";

type TitleWelcomeProps = {
  actions: AppActions;
  titleDemo: TitleDemo;
};

export const TitleWelcome = (props: TitleWelcomeProps) => {
  const { actions, titleDemo } = props;
  const { titleData, actions: titleActions } = titleDemo;
  const { name, slug, mainVariant } = titleData;
  const [isModalOpen, openModal, closeModal] = useModal();
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
              !
            </div>
            <div>
              Want to <Button onClick={openModal}>learn more</Button>?
            </div>
          </div>
          <div className={css.titlePageBoardGamesFlicker}>
            <Button onClick={titleActions.inc} text="→" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Welcome to Chessicals!"
      >
        <TitleMoreInfo actions={actions} />
      </Modal>
    </Fragment>
  );
};
