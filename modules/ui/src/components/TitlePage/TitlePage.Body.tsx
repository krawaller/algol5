import React, { Fragment } from "react";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { TitleMoreInfo } from "./TitlePage.MoreInfo";
import { AppActions } from "../../../../types";
import { TitleWelcome } from "./TitlePage.Welcome";
import { TitleDemo } from "./TitlePage.useTitleData";

type TitlePageBodyProps = {
  actions: AppActions;
  titleDemo: TitleDemo;
};

export const TitlePageBody = (props: TitlePageBodyProps) => {
  const { actions, titleDemo } = props;
  const [isModalOpen, openModal, closeModal] = useModal();

  return (
    <Fragment>
      <TitleWelcome actions={actions} titleDemo={titleDemo} />
      <button onClick={openModal}>Tell me more</button>
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
