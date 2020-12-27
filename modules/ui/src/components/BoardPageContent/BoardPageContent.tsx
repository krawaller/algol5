import React, { FunctionComponent } from "react";
import typography from "../../typography.cssProxy";

type BoardPageContentProps = {
  title: string;
};

/*
A small helper compontent for rendering content below the board
*/

export const BoardPageContent: FunctionComponent<BoardPageContentProps> = props => {
  const { title, children } = props;
  return (
    <div>
      <div className={typography.boardPageHeadline}>{title}</div>
      <div className={typography.boardPageCopy}>{children}</div>
    </div>
  );
};
