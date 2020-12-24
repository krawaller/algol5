import classNames from "classnames";
import css from "./TitlePage.cssProxy";
import React, { Fragment, useCallback, CSSProperties } from "react";
import { Button } from "../Button";
import { TitleDemo } from "./TitlePage.useTitleData";
import { gameCount } from "../../../../common";
import { AppActions } from "../../../../types";
import shellCss from "../Shell/Shell.cssProxy";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { TitleMoreInfo } from "./TitlePage.MoreInfo";
import logo from "../../../dist/base64/logo.png.proxy";

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
  //const seeAllGames = useCallback(() => actions.navTo("/games"), [actions]);
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
            <div className={css.titlePageWelcomeRow}>
              <Button onClick={openModal}>Welcome</Button>
              <span>&nbsp;to</span>
            </div>
            <div>
              <img
                className={css.titlePageLogo}
                src={logo}
                alt="logo"
                title="logo"
              />
            </div>
            <div className={css.titlePageWelcomeRow}>
              <span>where we&nbsp;</span>
              <Button text={`play ${name}`} onClick={goToCurrentGame} />!
            </div>
            {/* <div>
              and{" "}
              <Button
                text={`${gameCount() - 1} other games`}
                onClick={seeAllGames}
              />
              !
            </div> */}
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
