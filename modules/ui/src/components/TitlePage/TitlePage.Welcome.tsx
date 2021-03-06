import css from "./TitlePage.cssProxy";
import React, { Fragment } from "react";
import { Button } from "../Button";
import { TitleDemo } from "./TitlePage.useTitleData";
import { useBattleNav } from "../../contexts";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { TitleMoreInfo } from "./TitlePage.MoreInfo";
import logo from "../../../dist/base64/logo.png.proxy";
import { Flicker } from "../Flicker";

type TitleWelcomeProps = {
  titleDemo: TitleDemo;
};

export const TitleWelcome = (props: TitleWelcomeProps) => {
  const { titleDemo } = props;
  const { titleData, actions: titleActions } = titleDemo;
  const { name, mainVariant, slug } = titleData;
  const [isModalOpen, openModal, closeModal] = useModal();
  const battleNavActions = useBattleNav();
  const goToCurrentGame = () =>
    battleNavActions.toNewLocalBattle(mainVariant, "playing", slug);
  return (
    <Fragment>
      <Flicker onLeft={titleActions.dec} onRight={titleActions.inc}>
        <div className={css.titlePageBoardWelcome}>
          <div className={css.titlePageWelcomeRow}>
            <Button onClick={openModal}>Welcome</Button>
            <span>&nbsp;to</span>
          </div>
          <img
            className={css.titlePageLogo}
            src={logo}
            alt="logo"
            title="logo"
          />
          <div className={css.titlePageWelcomeRow}>
            <span>where we&nbsp;</span>
            <Button text={`play ${name}`} onClick={goToCurrentGame} />!
          </div>
        </div>
      </Flicker>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Welcome to Chessicals!"
      >
        <TitleMoreInfo />
      </Modal>
    </Fragment>
  );
};
