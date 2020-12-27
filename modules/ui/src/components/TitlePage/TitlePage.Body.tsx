import React from "react";
import { AppActions } from "../../../../types";
import { TitleWelcome } from "./TitlePage.Welcome";
import { TitleDemo } from "./TitlePage.useTitleData";
import css from "./TitlePage.cssProxy";

type TitleBodyProps = {
  actions: AppActions;
  titleDemo: TitleDemo;
};

export const TitleBody = (props: TitleBodyProps) => {
  const { actions, titleDemo } = props;

  return (
    <div className={css.titlePageBodyContainer}>
      <TitleWelcome actions={actions} titleDemo={titleDemo} />
    </div>
  );
};
