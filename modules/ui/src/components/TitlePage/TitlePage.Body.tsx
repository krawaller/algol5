import React from "react";
import { TitleWelcome } from "./TitlePage.Welcome";
import { TitleDemo } from "./TitlePage.useTitleData";
import css from "./TitlePage.cssProxy";

type TitleBodyProps = {
  titleDemo: TitleDemo;
};

export const TitleBody = (props: TitleBodyProps) => {
  const { titleDemo } = props;

  return (
    <div className={css.titlePageBodyContainer}>
      <TitleWelcome titleDemo={titleDemo} />
    </div>
  );
};
